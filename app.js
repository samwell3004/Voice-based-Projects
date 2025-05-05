const startBtn = document.getElementById("startBtn");
const clearBtn = document.getElementById("clearBtn");
const chatLog = document.getElementById("chatLog");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;

const synth = window.speechSynthesis;

// Load chat history on startup
window.onload = () => {
  const saved = localStorage.getItem("chatHistory");
  if (saved) {
    const messages = JSON.parse(saved);
    messages.forEach(({ sender, text, cls }) => {
      addMessage(sender, text, cls);
    });
  }
};

startBtn.onclick = () => {
  recognition.start();
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  addMessage("You", transcript, "user");
  respondToQuery(transcript);
};

function addMessage(sender, text, cls) {
  const div = document.createElement("div");
  div.className = `message ${cls}`;
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;

  saveMessage({ sender, text, cls });
}

function respondToQuery(message) {
  const msg = message.toLowerCase();
  let response = "Sorry, I didn’t understand that.";

  if (msg.includes("hours")) {
    response = "Our working hours are 9 AM to 5 PM, Monday to Friday.";
  } else if (msg.includes("order")) {
    response = "Sure, I can help. What issue are you facing with your order?";
  } else if (msg.includes("refund")) {
    response = "You can request a refund within 7 days of delivery.";
  } else if (msg.includes("hello") || msg.includes("hi")) {
    response = "Hello! How can I assist you today?";
  }

  addMessage("Bot", response, "bot");
  speak(response);
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  synth.speak(utter);
}

// Save message to localStorage
function saveMessage(messageObj) {
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  history.push(messageObj);
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

// Clear chat
clearBtn.onclick = () => {
  localStorage.removeItem("chatHistory");
  chatLog.innerHTML = "";
};
