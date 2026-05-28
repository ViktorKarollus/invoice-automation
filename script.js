 import {handleInput} from "./input.js";
 import { loadChat,clearChat,saveChat } from "./storage.js";
 import { SYSTEM_PROMPT } from "./prompt.js";
 import { downloadResult } from "./downloadresults.js";
 let latestResult = null;
 const webhookUrl = "http://10.204.18.32:8102/webhook/8781f1b4-f353-4bc9-a096-0bd4cd4441eb";  
 
 // Beim Laden der Seite alten Chat wiederherstellen
window.onload = () => {
  document.getElementById("chat").innerHTML = loadChat();
};
 async function send() {
      const chat = document.getElementById("chat");
  // Datei lesen hier ist das was ich bearbeite
  const fileContent = await handleInput();
  //Läd den alten chat ein
  const finalMessage=`
${SYSTEM_PROMPT}
Dateiinhalt:
${fileContent}
`;
//Speichert nach dem File Input
saveChat(chat.innerHTML);
//hier wieder code vom seminar
//showes somthing is loading
chat.innerHTML += `
  <div class="bot loading" id="loadingMessage">
    Processing invoice...
  </div>
`;
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ message:finalMessage })
      });
      //removes the loading text
      document.getElementById("loadingMessage")?.remove();
      const data = await res.json();
      console.log(data);
      const rawReply = data[0].reply;
      console.log(rawReply)
      let parsedReply;
try {
  parsedReply = JSON.parse(rawReply);
  latestResult = parsedReply;
} catch (error) {
  parsedReply = {
    error: "Response was not valid JSON",
    rawResponse: rawReply
  };
}
      chat.innerHTML += `<div class="bot"><b>Analysis Result</b><p>${escapeHtml(parsedReply.summary)}</p></div>`;
      //code seminar rum
      //Speichert den chat nach dem ai output.
      saveChat(chat.innerHTML);
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