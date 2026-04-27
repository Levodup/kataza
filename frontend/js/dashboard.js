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

function loadSummary() {
  fetch(API + "summary.php")
    .then((res) => res.json())
    .then((res) => {
      let d = res.data;

      document.getElementById("totalContributions").innerText = format(
        d.contributions,
      );

      document.getElementById("totalExpenses").innerText = format(d.expenses);

      document.getElementById("netSavings").innerText = format(d.net);

      document.getElementById("totalLoans").innerText = format(d.loans);

      document.getElementById("progressBar").style.width = d.progress + "%";

      document.getElementById("progressBar").innerText = d.progress + "%";
    });
}

function format(val) {
  return Number(val).toLocaleString();
}

function loadChart() {
  fetch(API + "report.php")
    .then((res) => res.json())
    .then((res) => {
      let weeks = res.data.weeks;

      let labels = [];
      let totals = [];

      for (let i = 1; i <= 52; i++) {
        let sum = 0;

        Object.values(weeks[i] || {}).forEach((v) => (sum += Number(v)));

        labels.push("W" + i);
        totals.push(sum);
      }

      new Chart(document.getElementById("growthChart"), {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Weekly Contributions",
              data: totals,
              borderWidth: 2,
            },
          ],
        },
      });
    });
}

document.addEventListener("DOMContentLoaded", loadSummary);
document.addEventListener("DOMContentLoaded", loadForecast);
