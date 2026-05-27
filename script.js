 import {handleInput} from "./input.js";
 import { loadChat,clearChat,saveChat } from "./storage.js";
 const webhookUrl = "http://10.204.18.32:8102/webhook/8781f1b4-f353-4bc9-a096-0bd4cd4441eb";  
 
 // Beim Laden der Seite alten Chat wiederherstellen
window.onload = () => {
  document.getElementById("chat").innerHTML = loadChat();
};
 async function send() {
      const input = document.getElementById("msg");
      const chat = document.getElementById("chat");
      const message = input.value.trim();
      //muss später entfernt werden verhinder den starte ohne message
      if (!message) return;

      chat.innerHTML += `<div class="user"><b>You:</b> ${escapeHtml(message)}</div>`;
      input.value = "";
  // Datei lesen hier ist das was ich bearbeite
  const fileContent = await handleInput();
  //Läd den alten chat ein
  const previousChat = loadChat();
  const finalMessage=`Bisheriger Verlauf:
${previousChat}
Neue Nachricht:
${message}
Dateiinhalt:
${fileContent}
`;
//zeigt im chat an?
chat.innerHTML += `
  <div class="bot">
    <pre>${escapeHtml(fileContent)}</pre>
  </div>
`;
//Speichert nach dem File Input
saveChat(chat.innerHTML);
//hier wieder code vom seminar
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ message:finalMessage })
      });

      const data = await res.json();
      chat.innerHTML += `<div class="bot"><b>Bot:</b> ${escapeHtml(data.reply || JSON.stringify(data))}</div>`;
      //code seminar rum
      //Speichert den chat nach dem ai output.
      saveChat(chat.innerHTML);
    }

    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, s => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
      }[s]));
    }
document.getElementById("clearBtn").addEventListener("click", clearChat);
document.getElementById("sendBtn").addEventListener("click", send);