// Setup animation
let Anim = bodymovin.loadAnimation({
  container: AnimationContainer, // ID - div container
  animationData: BODY_MOVIN_DATA, // Asset Animation
  renderer: "svg",
  loop: true,
  autoplay: false
});

// Setup Speech Recognition
let recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.lang = "es-ES";
recognition.continuous = true;
recognition.interimResults = false;

// Dispatch when the speech recognition service returns a result
recognition.onresult = event => {
  const { results } = event;

  txaResult.value = Object.keys(results).map(key => results[key][0].transcript);
  txPrecision.textContent = `Nivel de precisión: ${
    results[results.length - 1][0].confidence
  }`;
};

// Dispatch when the speech recognition service has disconnected
recognition.onsoundend = e => {
  const text =
    "Si quieres escuchar lo que has dicho, dale click al boton play.";
  setTimeout(() => SpeechFromText(text), 1000);
};

// Dispatch when the speech recognition error occurs
recognition.onerror = ({ error }) => {
  alertError.style = { display: null };
  alertError.textContent = "Error occurred in recognition: " + error;
  Anim.stop();
};

// Dispatch when user click button record
btnRecord.addEventListener("click", () => {
  recognition.start();
  Anim.play();
});

// Dispatch when user click button Stop Recording
btnStopRecord.addEventListener("click", () => {
  recognition.stop();
  Anim.stop();
});

// Dispatch when user click button Play text
btnPlayText.addEventListener("click", () => {
  SpeechFromText(txaResult.value || "Primero debes grabar tu voz");
});

// Text to Seech
const SpeechFromText = (text, rate = 1, pitch = 1) => {
  let utterThis = new SpeechSynthesisUtterance(text);

  utterThis.lang = "es-ES";
  utterThis.pitch = rate;
  utterThis.rate = pitch;
  utterThis.volume = 1;

  speechSynthesis.speak(utterThis);
};
