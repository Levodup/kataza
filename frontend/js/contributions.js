// frontend/js/contributions.js

const API = "../backend/api/";

let members = [];

/* =========================
   LOAD MEMBERS INTO SELECT
========================= */
function loadMembers() {
  fetch(API + "members.php")
    .then((res) => res.json())
    .then((res) => {
      const data = res.data || res;

      members = data;

      let options = `<option value="">Select Member</option>`;

      data.forEach((m) => {
        options += `<option value="${m.id}">${m.name}</option>`;
      });

      document.getElementById("memberSelect").innerHTML = options;
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to load members");
    });
}

/* =========================
   ON MEMBER SELECT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadMembers();

  document
    .getElementById("memberSelect")
    .addEventListener("change", function () {
      let memberId = this.value;
      if (!memberId) return;

      /* ❌ BROKEN BEFORE:
       If member not found → JS crash → grid never renders
    */
      let selected = members.find((m) => m.id == memberId);

      if (!selected) {
        console.error("Member not found");
        return;
      }

      document.getElementById("memberName").value = selected.name;

      fetch(API + "contribution_details.php?member_id=" + memberId)
        .then((res) => res.json())
        .then((res) => {
          console.log("API response:", res); // DEBUG (helps detect API mismatch)

          if (!res.status) {
            alert(res.message);
            return;
          }

          let data = res.data || {};

          // Last contribution
          document.getElementById("lastAmount").value = data.last
            ? data.last.amount
            : 0;

          /* ❌ BROKEN BEFORE:
           You used data.availableWeeks (which no longer exists)
           → JS error → stops execution → grid not displayed
        */

          /* ✅ FIX:
           Build week dropdown using weeksStatus
        */
          let weekOptions = "";

          for (let i = 1; i <= 52; i++) {
            // show week if:
            // not recorded OR deleted
            if (!data.weeksStatus?.[i] || data.weeksStatus[i] === 2) {
              weekOptions += `<option value="${i}">Week ${i}</option>`;
            }
          }

          document.getElementById("weekSelect").innerHTML = weekOptions;

          renderWeeksGrid(data.weeksStatus);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to load contribution details");
        });
    });
});

/* =========================
   RENDER WEEK GRID
========================= */
function renderWeeksGrid(weeksStatus = {}) {
  // ❌ BROKEN BEFORE:
  // if weeksStatus undefined → crash → nothing displays

  let currentWeek = getCurrentWeek();
  let html = "";

  for (let i = 1; i <= 52; i++) {
    let status = weeksStatus[i]; // 1, 2, or undefined

    let checked = status === 1 ? "checked" : "";
    let color = status === 2 ? "red" : status === 1 ? "green" : "";

    let disabled = i > currentWeek ? "disabled" : "";

    html += `
      <div style="width:80px;">
        <label style="color:${color}">
          <input 
            type="checkbox"
            data-week="${i}"
            ${checked}
            ${disabled}
            onchange="toggleWeek(this)"
          >
          W${i}
        </label>
      </div>
    `;
  }

  document.getElementById("weeksGrid").innerHTML = html;
}

/* =========================
   SAVE CONTRIBUTION
========================= */
function saveContribution() {
  let memberId = document.getElementById("memberSelect").value;
  let amount = document.getElementById("newAmount").value;
  let week = document.getElementById("weekSelect").value;

  if (!memberId || !amount || !week) {
    alert("All fields are required");
    return;
  }

  fetch(API + "contributions.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        member_id: memberId,
        amount: amount,
        week: week,
        year: new Date().getFullYear(),
        paid: 1,
      },
    ]),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        alert(res.message);
        return;
      }

      alert("Saved");

      // reload UI
      document
        .getElementById("memberSelect")
        .dispatchEvent(new Event("change"));
    })
    .catch((err) => {
      console.error(err);
      alert("Error saving contribution");
    });
}

/* =========================
   ADD MEMBER
========================= */
function addMember() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;

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
        alert(res.message);
        return;
      }

      alert("Member added");

      loadMembers();

      let modal = bootstrap.Modal.getInstance(
        document.getElementById("memberModal"),
      );
      modal.hide();
    })
    .catch((err) => {
      console.error(err);
      alert("Error adding member");
    });
}

/* =========================
   WEEK CALCULATOR
========================= */
function getCurrentWeek() {
  let now = new Date();
  let start = new Date(now.getFullYear(), 0, 1);
  let diff = (now - start) / (1000 * 60 * 60 * 24);
  return Math.ceil(diff / 7);
}

/* =========================
   TOGGLE WEEK PAYMENT
========================= */
function toggleWeek(checkbox) {
  let memberId = document.getElementById("memberSelect").value;
  let amount = document.getElementById("lastAmount").value;
  let week = checkbox.dataset.week;

  let checked = checkbox.checked ? 1 : 0;

  fetch(API + "contributions.php", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      member_id: memberId,
      week: week,
      year: new Date().getFullYear(),
      amount: amount,
      checked: checked,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        alert("Failed");
        checkbox.checked = !checkbox.checked;
        return;
      }

      // Live color update
      let label = checkbox.parentElement;

      if (checked) {
        label.style.color = "green";
      } else {
        label.style.color = "red";
      }
    })
    .catch((err) => {
      console.error(err);
      checkbox.checked = !checkbox.checked;
      alert("Error updating week");
    });
}

function loadProofMembers() {
  fetch(API + "members.php")
    .then((res) => res.json())
    .then((res) => {
      console.log("Members:", res);

      let data = res.data || res;

      if (!Array.isArray(data)) return;

      let options = '<option value="">Select Member</option>';

      data.forEach((m) => {
        options += `<option value="${m.id}">${m.name}</option>`;
      });

      document.getElementById("proofMember").innerHTML = options;
    })
    .catch((err) => console.error(err));
}

// When proof modal opens, load members and set current datetime

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("proofModal");

  if (!modal) return; // safety

  modal.addEventListener("shown.bs.modal", () => {

    // Load members
    loadProofMembers();

    // Set current datetime
    let now = new Date();
    let formatted = now.toISOString().slice(0, 16);

    document.getElementById("paymentDatetime").value = formatted;
  });

});

document.getElementById("proofType").addEventListener("change", function () {
  let type = this.value;

  let weeks = 1;

  if (type == 2 || type == 5) {
    weeks = 4; // month
  }

  document.getElementById("weeksCovered").value = weeks;
});

function saveProof() {
  let payload = {
    member_id: document.getElementById("proofMember").value,
    amount: document.getElementById("proofAmount").value,
    ref_id: document.getElementById("proofRef").value,
    payment_type: document.getElementById("proofType").value,
    weeks_covered: document.getElementById("weeksCovered").value,
    payment_mode: document.getElementById("paymentMode").value,
    payment_datetime: document.getElementById("paymentDatetime").value,
  };

  fetch(API + "proof.php", {
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

      alert("Saved");

      let modal = bootstrap.Modal.getInstance(
        document.getElementById("proofModal"),
      );
      modal.hide();
    });

  function formatDate(date) {
    if (!date) return "-";

    let d = new Date(date);

    return d.toLocaleString();
  }
}
