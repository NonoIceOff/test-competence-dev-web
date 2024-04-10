$(document).ready(function () {
  let interval;
  const urlInput = $("#setURL");
  const intervalInput = $("#setInterval");
  let url = urlInput.val();
  let intervalSeconds = intervalInput.val() * 1000;

  $("#startButton").click(function () {
    clearInterval(interval);
    url = urlInput.val();
    intervalSeconds = intervalInput.val() * 1000;
    interval = setInterval(testResponseTime, intervalSeconds);
  });

  $("#stopButton").click(function () {
    clearInterval(interval);
  });

  function testResponseTime() {
    let startTime = new Date().getTime();
    $.ajax({
      url: url,
      method: "GET",
      success: function (response) {
        let endTime = new Date().getTime();
        let responseTime = endTime - startTime;
        displayResult(
          "[" +
            new Date().toLocaleTimeString() +
            "] Response time: " +
            responseTime +
            "ms"
        );
      },
      error: function (xhr, status, error) {
        displayResult("Error: " + error);
      },
    });
  }

  function displayResult(message) {
    $("#result").append("<p>" + message + "</p>");
  }
});
