// frontend/js/app.js

const API = "../backend/api/";

let members = [];

/* =========================
   LOAD MEMBERS
========================= */
function loadMembers() {
  fetch(API + "members.php")
    .then((res) => res.json())
    .then((res) => {
      const data = res.data || res;

      members = data;

      let html = "";

      data.forEach((m) => {
        html += `
          <tr data-id="${m.id}">
            <td>${m.name}</td>
            <td>
              <input type="number" value="20000" class="form-control amount">
            </td>
            <td class="text-center">
              <input type="checkbox" checked class="paid">
            </td>
          </tr>
        `;
      });

      const tbody = document.querySelector("#table tbody");
      if (tbody) tbody.innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to load members");
    });
}

/* =========================
   ADD MEMBER
========================= */
function addMember() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) {
    alert("Name and phone are required");
    return;
  }

  fetch(API + "members.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, phone }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        alert(res.message || "Failed to add member");
        return;
      }

      alert("Member added");

      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";

      loadMembers();
    })
    .catch((err) => {
      console.error(err);
      alert("Error adding member");
    });
}

/* =========================
   SAVE CONTRIBUTIONS
========================= */
function saveContributions(event) {
  const btn = event?.target;

  let week = document.getElementById("week").value;
  let year = document.getElementById("year").value;

  if (!week || !year) {
    alert("Week and year are required");
    return;
  }

  let rows = document.querySelectorAll("#table tbody tr");

  if (rows.length === 0) {
    alert("No members found");
    return;
  }

  let payload = [];

  for (let row of rows) {
    let member_id = row.dataset.id;
    let amount = row.querySelector(".amount").value;
    let paid = row.querySelector(".paid").checked ? 1 : 0;

    if (!amount || amount <= 0) {
      alert("Invalid amount detected");
      return;
    }

    payload.push({
      member_id: member_id,
      amount: amount,
      week: week,
      year: year,
      paid: paid,
    });
  }

  // Loading state
  if (btn) {
    btn.disabled = true;
    btn.innerText = "Saving...";
  }

  fetch(API + "contributions.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        alert(res.message || "Failed to save");
        return;
      }

      alert("Saved successfully");

      // Reset inputs
      document.getElementById("week").value = "";
      document.getElementById("year").value = "";

      loadMembers();
    })
    .catch((err) => {
      console.error(err);
      alert("Error saving contributions");
    })
    .finally(() => {
      if (btn) {
        btn.disabled = false;
        btn.innerText = "Save";
      }
    });
}

/* =========================
   RESIZE OBSERVER
========================= */
function initResizeObserver() {
  const table = document.getElementById("table");

  if (!table) return;

  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.contentRect.width < 500) {
        table.classList.add("table-sm");
      } else {
        table.classList.remove("table-sm");
      }
    }
  });

  observer.observe(table);
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadMembers();
  initResizeObserver();
});
