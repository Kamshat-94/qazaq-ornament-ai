const URL = "https://teachablemachine.withgoogle.com/models/kUoZfL9kz/";

let model;

async function loadModel() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  console.log("Qazaq Ornament AI моделі дайын!");
}

loadModel();

const fileInput = document.getElementById("imageUpload");

fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = async function (e) {
    const preview = document.getElementById("preview");
    preview.src = e.target.result;
    preview.style.display = "block";

    if (!model) {
      alert("Модель әлі жүктеліп жатыр. Бірнеше секундтан кейін қайталап көріңіз.");
      return;
    }

    const predictions = await model.predict(preview);

    predictions.sort((a, b) => b.probability - a.probability);

    const best = predictions[0];
    const percent = (best.probability * 100).toFixed(1);

    document.getElementById("ornamentName").textContent =
      best.className;

    document.getElementById("confidence").textContent =
      "Сәйкестік: " + percent + "%";

    const info = {
      "Қошқармүйіз": {
        description:
          "Қошқармүйіз — қазақ ою-өрнегіндегі кең таралған дәстүрлі өрнектердің бірі.",
        idea:
          "Дизайн идеясы: киім, сөмке, дәптер мұқабасы және интерьер элементтерінде қолдануға болады."
      },

      "Түйетабан": {
        description:
          "Түйетабан — түйе табанының бейнесіне ұқсастырылып жасалған қазақтың дәстүрлі оюларының бірі.",
        idea:
          "Дизайн идеясы: заманауи киім принтінде, аксессуарларда және сувенир дизайнында қолдануға болады."
      },

      "Тұмарша": {
        description:
          "Тұмарша — үшбұрышты пішінмен байланысты қазақтың дәстүрлі оюларының бірі.",
        idea:
          "Дизайн идеясы: әшекей, киім принті, сөмке және заманауи сувенир дизайнында қолдануға болады."
      }
    };

    const ornamentInfo = info[best.className];

    document.getElementById("description").textContent =
      ornamentInfo ? ornamentInfo.description : "";

    document.getElementById("designIdea").textContent =
      ornamentInfo ? ornamentInfo.idea : "";
if (best.className === "Қошқармүйіз") {
  document.getElementById("designMockup").src =
    "https://i.postimg.cc/kGYWDTkY/Izobrazenie-Chat-GPT-29-sent-2026-g-02-55-03.png";
}

if (best.className === "Түйетабан") {
  document.getElementById("designMockup").src =
    "https://i.postimg.cc/Dfg9k3tX/Izobrazenie-Chat-GPT-29-sent-2026-g-16-21-27.png";
}
if (best.className === "Тұмарша") {
  document.getElementById("designMockup").src =
    "https://i.postimg.cc/5Nk86pHC/Izobrazenie-Chat-GPT-29-sent-2026-g-16-45-00.png";
}
document.getElementById("visualIdeas").style.display = "block";
document.getElementById("result").style.display = "block";
  };

  reader.readAsDataURL(file);
});