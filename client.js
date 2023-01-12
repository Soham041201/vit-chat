const socket = io("https://elegant-zuccutto-6c0418.netlify.app/", {
  transports: ["websocket", "polling", "flashsocket"],
});

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

const name = prompt("Enter your name to join the chat","Student");

if (name != undefined) {
  socket.emit("new-user-joined", name);
}

socket.on("user-joined", (name) => {
  if (name != "") {
    append(`${name} joined the chat room`, "center");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if (messageInput.value != "") {
    append(`${message}`, "right");
  }
  socket.emit("send", message);
  messageInput.value = "";
});

socket.on("recieve", (data) => {
  if (data.message != "") {
    append(`${data.name} \n ${data.message}`, "left");
  }
});

socket.on("left", (data) => {
  append(`${data.name} left the chat room`, "center");
});

socket.dispose()