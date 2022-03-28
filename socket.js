const socket = io("http://localhost:3000");
const chatBox = document.getElementById("sendBox");
const chat = document.getElementById("message");

const userName = prompt("Your name , Please... ?");
appendMessage("You Joined !");
socket.emit("new-user", userName);

socket.on("chat", (data) => {
  appendMessage(`${data.name} : ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

chatBox.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = chat.value;
  appendMessage(`You : ${message}`);
  socket.emit("send-chat", message);
  chat.value = "";
});

function appendMessage(chat) {
  const messageEle = document.createElement("div");
  messageEle.innerText = chat;
  chatBox.append(messageEle);
}
