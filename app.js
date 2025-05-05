let recognition;
const subtitleDiv = document.getElementById("subtitle");

function startRecognition() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech Recognition not supported in this browser.");
    return;
  }

  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = function(event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    subtitleDiv.textContent = transcript;
  };

  recognition.onerror = function(event) {
    console.error("Speech Recognition Error:", event.error);
  };

  recognition.start();
}
