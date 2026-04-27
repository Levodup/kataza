const API = "../backend/api/";

/* =========================
   LOAD EXPENSES
========================= */
function loadExpenses() {
  fetch(API + "expenses.php")
    .then((res) => res.json())
    .then((res) => {
      let html = "";

      res.data.forEach((e) => {
        let type = e.type == 1 ? "Bank Charges" : "Withdrawal Ticket";

        html += `
          <tr>
            <td>${type}</td>
            <td>${e.description}</td>
            <td>${Number(e.amount).toLocaleString()}</td>
            <td>${e.operation_date}</td>
          </tr>
        `;
      });

      document.querySelector("#expenseTable tbody").innerHTML = html;
    });
}

/* =========================
   SAVE EXPENSE
========================= */
function saveExpense() {
  let payload = {
    type: document.getElementById("type").value,
    description: document.getElementById("description").value,
    amount: document.getElementById("amount").value,
    operation_date: document.getElementById("date").value,
  };

  fetch(API + "expenses.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        alert("Failed");
        return;
      }

      loadExpenses();
    });
}

/* INIT */
document.addEventListener("DOMContentLoaded", loadExpenses);
