const API = "../backend/api/";

/* =========================
   CURRENT WEEK
========================= */
function getCurrentWeek() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = (now - start) / (1000 * 60 * 60 * 24);
  return Math.ceil(diff / 7);
}

/* =========================
   WEEK RANGE (MON → SUN)
========================= */
function getWeekRange(week, year = new Date().getFullYear()) {

  let jan1 = new Date(year, 0, 1);

  let day = jan1.getDay();
  let diff = day === 0 ? -6 : 1 - day;

  let firstMonday = new Date(jan1);
  firstMonday.setDate(jan1.getDate() + diff);

  let start = new Date(firstMonday);
  start.setDate(firstMonday.getDate() + (week - 1) * 7);

  let end = new Date(start);
  end.setDate(start.getDate() + 6);

  const format = (d) => {
    let day = String(d.getDate()).padStart(2, "0");
    let month = String(d.getMonth() + 1).padStart(2, "0");
    return { day, month };
  };

  let s = format(start);
  let e = format(end);

  return `[${s.day}-${e.day}/${s.month}]`;
}

/* =========================
   LOAD REPORT
========================= */
function loadReport() {

  fetch(API + "report.php")
    .then(res => res.text())
    .then(text => {

      let res;
      try {
        res = JSON.parse(text);
      } catch {
        alert("Invalid server response");
        return;
      }

      if (!res.status) {
        alert(res.message || "Failed to load report");
        return;
      }

      const data = res.data || {};
      let members = data.members || [];
      const weeks = data.weeks || {};

      // Ensure array
      if (!Array.isArray(members)) {
        members = Object.keys(members);
      }

      // SORT (clean UI)
      members.sort();

      const currentWeek = getCurrentWeek();

      const tableHead = document.querySelector("#reportTable thead tr");
      const tableBody = document.querySelector("#reportTable tbody");

      if (!tableHead || !tableBody) return;

      /* =========================
         HEADER
      ========================= */
      let headerHTML = "<th>Week</th>";

      members.forEach(m => {
        headerHTML += `<th>${m}</th>`;
      });

      headerHTML += "<th>Weekly Total</th>";

      tableHead.innerHTML = headerHTML;

      /* =========================
         BODY
      ========================= */
      let bodyHTML = "";
      let memberTotals = {};
      let globalTotal = 0;

      members.forEach(m => memberTotals[m] = 0);

      for (let i = 1; i <= currentWeek; i++) {

        let rowTotal = 0;
        let range = getWeekRange(i);

        bodyHTML += `<tr><td><b>W${i} ${range}</b></td>`;

        members.forEach(m => {

          let val = Number(weeks[i]?.[m] || 0);

          rowTotal += val;
          memberTotals[m] += val;

          bodyHTML += `<td>${val ? format(val) : ""}</td>`;
        });

        globalTotal += rowTotal;

        bodyHTML += `<td><b>${format(rowTotal)}</b></td></tr>`;
      }

      /* =========================
         TOTAL ROW
      ========================= */
      bodyHTML += `<tr class="table-dark"><td><b>TOTAL</b></td>`;

      members.forEach(m => {
        bodyHTML += `<td><b>${format(memberTotals[m])}</b></td>`;
      });

      bodyHTML += `<td><b>${format(globalTotal)}</b></td></tr>`;

      tableBody.innerHTML = bodyHTML;

      /* =========================
         LABEL
      ========================= */
      const label = document.getElementById("currentWeekLabel");
      if (label) {
        label.innerText = "Showing up to Week " + currentWeek;
      }

    })
    .catch(err => {
      console.error(err);
      alert("Error loading report");
    });
}

/* =========================
   FORMAT NUMBERS
========================= */
function format(val) {
  return val >= 1000 ? (val / 1000) + "k" : val;
}

/* =========================
   DOWNLOAD PDF
========================= */
function downloadPDF() {

  const element = document.getElementById("reportContainer");

  if (!element) {
    alert("Report not found");
    return;
  }

  // Force layout for wide tables
  element.style.width = "1200px";

  html2pdf()
    .set({
      margin: 5,
      filename: "kataza_weekly_report.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a3", orientation: "landscape" }
    })
    .from(element)
    .save()
    .then(() => {
      element.style.width = "";
    });
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", loadReport);