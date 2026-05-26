export async function handleInput() {
const fileInput=document.getElementById("fileInput");
const file = fileInput.files[0];
  if (!file) return "";
return await file.text();
}