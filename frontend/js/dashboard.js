const API = "../backend/api/";

function loadForecast() {
  fetch(API + "contributions.php?forecast=1")
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        console.error(res);
        return;
      }

      let data = res.data;

      // Format number (RWF style)
      let amount = Number(data.expected_total).toLocaleString();

      document.getElementById("expectedYearAmount").innerText = amount + " RWF";

      document.getElementById("weeksLeft").innerText =
        data.weeks_left + " weeks left";
    })
    .catch((err) => {
      console.error(err);
    });
}

document.addEventListener("DOMContentLoaded", loadForecast);
