//speichert die Chat historie im localStorage
export function saveChat(Content) {
  localStorage.setItem("chatHistory",Content);
}
//gibt die chathistory zurück
export function loadChat(){
    return localStorage.getItem("chatHistory") || "";
}
//löscht die chathistory und macht den chat wieder ""
export function clearChat() {
  localStorage.removeItem("chatHistory");

  document.getElementById("chat").innerHTML = "";
}

