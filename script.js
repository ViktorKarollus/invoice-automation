 import {handleInput} from "./input.js";
 const webhookUrl = "http://10.204.18.32:8102/webhook/8781f1b4-f353-4bc9-a096-0bd4cd4441eb";  
 async function send() {
      const input = document.getElementById("msg");
      const chat = document.getElementById("chat");
      const message = input.value.trim();
      if (!message) return;

      chat.innerHTML += `<div class="user"><b>You:</b> ${escapeHtml(message)}</div>`;
      input.value = "";
  // Datei lesen hier ist das was ich bearbeite
  const fileContent = await handleInput();
console.log(fileContent);
//zeigt im chat an?
chat.innerHTML += `
  <div class="bot">
    <pre>${escapeHtml(fileContent)}</pre>
  </div>
`;
//hier wieder code vom seminar
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      chat.innerHTML += `<div class="bot"><b>Bot:</b> ${escapeHtml(data.reply || JSON.stringify(data))}</div>`;
    }
    //auch von mir
    window.send = send;

    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, s => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
      }[s]));
    }