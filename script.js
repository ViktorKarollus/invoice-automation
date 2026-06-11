 import {handleInput} from "./input.js";
 import { loadChat,clearChat,saveChat,saveinvoice,loadinvoice} from "./storage.js";
 import { FINANCIAL_PROMPT,METADATA_PROMPT,VALIDATION_PROMPT,RECOMMENDATION_PROMPT,SUMMARY_PROMPT } from "./prompt.js";
 import { downloadResult,downloadCSV } from "./downloadresults.js";
 import { renderInvoices } from "./invoicecards.js";
 let latestResult = null;
 const webhookUrl = "http://10.204.18.32:8102/webhook/8781f1b4-f353-4bc9-a096-0bd4cd4441eb";  
 
 // Restore previous chat history and invoice cards on page load
window.onload = () => {
  document.getElementById("chat").innerHTML = loadChat();
  document.getElementById("invoiceContainer").innerHTML =loadinvoice();
};
// Sends a prompt and content to the selected agent
async function callAgent(prompt, content) {
   try {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      message: `
${prompt}

Invoice:
${content}
`
    })
  });

  const data = await res.json();

  return JSON.parse(data[0].reply);
}catch (error) {

    console.error("Agent Error:", error);

    throw error;
  }
}
// Main invoice analysis workflow
 async function send() {
  try{
      const chat = document.getElementById("chat");
  const fileContent = await handleInput();

chat.innerHTML += `
  <div class="bot loading" id="loadingMessage">
    Extract invoice...
  </div>
`;
// metadata extraction agent
const metadata = await callAgent(
    METADATA_PROMPT,
    fileContent
  );

  console.log("Metadata Agent:");
  console.log(metadata);
  // Financial extraction agent
const financial = await callAgent(
  FINANCIAL_PROMPT,
  fileContent
);

console.log("Financial Agent:");
console.log(financial);
// Merge extracted invoice data
const extractedInvoice = {
  ...metadata,
  ...financial
};
document.getElementById("loadingMessage")?.remove();
console.log("Final Extraction Agent:");
console.log(extractedInvoice);
chat.innerHTML += `
  <div class="bot loading" id="loadingMessage">
    Validate invoice...
  </div>
`;
// Validation phase
const validation = await callAgent(
  VALIDATION_PROMPT,
  JSON.stringify(extractedInvoice)
);
console.log("validaton Agent:");
console.log(validation);
document.getElementById("loadingMessage")?.remove();
chat.innerHTML += `
  <div class="bot loading" id="loadingMessage">
    Summarise invoice...
  </div>
`;
// Generate invoice summary
const summary = await callAgent(
  SUMMARY_PROMPT,
  JSON.stringify({
    ...extractedInvoice,
    ...validation
  })
);
console.log("summary Agent:");
console.log(summary);
document.getElementById("loadingMessage")?.remove();
chat.innerHTML += `
  <div class="bot loading" id="loadingMessage">
    Create invoice recommendation...
  </div>
`;
// Generate recommendation for the user
const recommendation = await callAgent(
  RECOMMENDATION_PROMPT,
  JSON.stringify({
    ...extractedInvoice,
    ...validation
  })
);
console.log("recommendation Agent:");
console.log(recommendation);
document.getElementById("loadingMessage")?.remove();
// Build final analysis result
const finalResult = {
  summary: summary.summary,
  recommendation: recommendation.recommendation,
  invoices: [
    {
      ...extractedInvoice,
      ...validation
    }
  ]
};
console.log("final result:")
console.log(finalResult);
renderInvoices(finalResult.invoices)
saveinvoice();
// Store latest result for JSON and CSV export
latestResult=finalResult;
      document.getElementById("loadingMessage")?.remove();
      chat.innerHTML += `
<div class="bot">
  <b>Analysis Result</b>
  <p>${escapeHtml(finalResult.summary)}</p>
  <p>
    <strong>Recommendation:</strong>
    ${escapeHtml(finalResult.recommendation)}
  </p>
</div>
`;
saveChat(chat.innerHTML);
  }catch(error){
    console.error(error);
    chat.innerHTML += `
      <div class="bot">
        Error while processing invoice.
      </div>
    `;
  }
}

    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, s => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
      }[s]));
    }
    //buttons für senden und fürs chat löschen und results downloaden
document.getElementById("clearBtn").addEventListener("click", clearChat);
document.getElementById("sendBtn").addEventListener("click", send);
document.getElementById("downloadBtn").addEventListener("click",()=> downloadResult(latestResult));
document.getElementById("downloadBtncsv").addEventListener("click",()=> downloadCSV(latestResult));