//  L'exercice a été fait à l'aide d'AJAX, ce qui ne permet pas d'utiliser ICMP, les données reliées à cette dernière sont imités voire non affichées
//  Le nombre de bytes n'est pas récupérable et le nombre de séquences ICMP également.

document.addEventListener("DOMContentLoaded", function () {
  let interval;
  const urlInput = document.getElementById("setURL");
  const intervalInput = document.getElementById("setInterval");
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  let url = urlInput.value;
  let intervalSeconds = intervalInput.value * 1000;
  let icmpSeq = 0;

  // This function is a trigger of the start button. It disables by itself, and enables the stop button.
  startButton.onclick = function () {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    clearInterval(interval);
    url = urlInput.value;
    intervalSeconds = intervalInput.value * 1000;
    icmpSeq = 0;

    interval = setInterval(testResponseTime, intervalSeconds);
    startButton.disabled = true;
    stopButton.disabled = false;
  };

  // This function is a trigger of the stop button. It disables by itself, and enables the start button.
  stopButton.onclick = function () {
    clearInterval(interval);
    startButton.disabled = false;
    stopButton.disabled = true;
  };

  // This function calculates the time in ms of the response.
  function testResponseTime() {
    let startTime = new Date().getTime();
    fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => {
        let endTime = new Date().getTime();
        let responseTime = endTime - startTime;
        icmpSeq++;
        displayResult(response, icmpSeq, responseTime);
      })
      .catch((error) => {
        displayResult("Erreur: " + error);
      });
  }

  // This function adds an element "p" in a "div" in html code.
  // @params : "response" the content of the page, "icmpSeq" the imitation variable of the real functionnality, "responseTime" the time in ms who the content of the page arrives.
  function displayResult(response, icmpSeq, responseTime) {
    let message =
      "[" +
      new Date().toLocaleTimeString() +
      "] Bytes from " +
      url +
      ": icmp_seq=" +
      icmpSeq +
      " time=" +
      responseTime +
      "ms";
    var paragraph = document.createElement("p");
    var textParagraph = document.createTextNode(message);
    paragraph.appendChild(textParagraph);
    document.getElementById("result").appendChild(paragraph);
  }
});
