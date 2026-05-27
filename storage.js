export function saveChat(Content) {
  localStorage.setItem("chatHistory",Content);
}
export function loadChat(){
    return localStorage.getItem("chatHistory") || "";
}

export function clearChat() {
  localStorage.removeItem("chatHistory");

  document.getElementById("chat").innerHTML = "";
}

