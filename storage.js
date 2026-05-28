// speichert die Chat historie im localStorage
export function saveChat(Content) {
  localStorage.setItem("chatHistory", Content);
}

// gibt die chathistory zurück
export function loadChat() {
  return localStorage.getItem("chatHistory") || "";
}

// speichert invoice cards
export function saveinvoice() {
  localStorage.setItem(
    "invoiceCards",
    document.getElementById("invoiceContainer").innerHTML
  );
}

// lädt invoice cards
export function loadinvoice() {
  return localStorage.getItem("invoiceCards") || "";
}

// löscht alles
export function clearChat() {

  localStorage.removeItem("chatHistory");
  localStorage.removeItem("invoiceCards");

  document.getElementById("chat").innerHTML = "";

  document.getElementById("invoiceContainer").innerHTML = "";
}