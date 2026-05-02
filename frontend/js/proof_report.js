const API = "../backend/api/";

function loadProofReport() {
  fetch(API + "proof_report.php")
    .then((res) => res.json())
    .then((res) => {
      let html = "";

      Object.keys(res.data).forEach((month) => {
        // Month header row
        html += `
          <tr class="table-primary">
            <td colspan="7"><b>${month}</b></td>
          </tr>
        `;

        res.data[month].forEach((p) => {
          html += `
            <tr>
              <td>${p.name}</td>
              <td>${p.ref_id}</td>
              <td>${Number(p.amount).toLocaleString()}</td>
              <td>${getType(p.payment_type)}</td>
              <td>${p.weeks_covered}</td>
              <td>${getMode(p.payment_mode)}</td>
              <td>${formatDate(p.payment_datetime)}</td>
            </tr>
          `;
        });
      });

      document.querySelector("#proofReportTable tbody").innerHTML = html;
    });
}

function getType(t) {
  return (
    {
      1: "Week",
      2: "Month",
      3: "Loan",
      4: "Loan + Week",
      5: "Loan + Month",
    }[t] || "-"
  );
}

function getMode(m) {
  return (
    {
      1: "Agent",
      2: "MoMo",
      3: "App",
      4: "Someone",
      5: "Bulk",
    }[m] || "-"
  );
}

function formatDate(d) {
  return new Date(d).toLocaleString();
}

document.addEventListener("DOMContentLoaded", loadProofReport);
