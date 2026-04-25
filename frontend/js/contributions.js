const API = "../backend/api/";

let members = [];

/* =========================
   LOAD MEMBERS INTO SELECT
========================= */
function loadMembers() {
  fetch(API + "members.php")
    .then(res => res.json())
    .then(res => {

      let data = res.data || res;

      members = data;

      let options = `<option value="">Select Member</option>`;

      data.forEach(m => {
        options += `<option value="${m.id}">${m.name}</option>`;
      });

      document.getElementById("memberSelect").innerHTML = options;
    })
    .catch(err => {
      console.error(err);
      alert("Failed to load members");
    });
}

/* =========================
   ON MEMBER SELECT
========================= */
document.addEventListener("DOMContentLoaded", () => {

  loadMembers();

  document.getElementById("memberSelect").addEventListener("change", function () {

    let memberId = this.value;

    if (!memberId) return;

    // Set member name
    let selected = members.find(m => m.id == memberId);
    document.getElementById("memberName").value = selected.name;

    // Load contribution details
    fetch(API + "contribution_details.php?member_id=" + memberId)
      .then(res => res.json())
      .then(res => {

        if (!res.status) {
          alert(res.message);
          return;
        }

        let data = res.data;

        // Last contribution
        document.getElementById("lastAmount").value = data.last ? data.last.amount : 0;

        // Weeks dropdown
        let weekOptions = '';
        data.availableWeeks.forEach(w => {
          weekOptions += `<option value="${w}">Week ${w}</option>`;
        });

        document.getElementById("weekSelect").innerHTML = weekOptions;

        renderWeeksGrid(data.paidWeeks);
      });
  });
});

/* =========================
   RENDER WEEK GRID
========================= */
function renderWeeksGrid(paidWeeks) {

  let currentWeek = getCurrentWeek();
  let html = '';

  for (let i = 1; i <= 52; i++) {

    let checked = paidWeeks.includes(i) ? 'checked' : '';
    let disabled = i > currentWeek ? 'disabled' : '';

    html += `
      <div style="width:80px;">
        <label>
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify([{
      member_id: memberId,
      amount: amount,
      week: week,
      year: new Date().getFullYear(),
      paid: 1
    }])
  })
  .then(res => res.json())
  .then(res => {

    if (!res.status) {
      alert(res.message);
      return;
    }

    alert("Saved");

    // Reload member data
    document.getElementById("memberSelect").dispatchEvent(new Event("change"));
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, phone })
  })
  .then(res => res.json())
  .then(res => {

    if (!res.status) {
      alert(res.message);
      return;
    }

    alert("Member added");

    loadMembers();

    let modal = bootstrap.Modal.getInstance(document.getElementById('memberModal'));
    modal.hide();
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

  if (!memberId) {
    alert("Select a member first");
    checkbox.checked = !checkbox.checked;
    return;
  }

  fetch(API + "contributions.php", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      member_id: memberId,
      week: week,
      year: new Date().getFullYear(),
      amount: amount,
      checked: checked
    })
  })
  .then(res => res.json())
  .then(res => {

    if (!res.status) {
      alert("Operation failed");
      checkbox.checked = !checkbox.checked;
      return;
    }

    // Optional: visual feedback
    if (checked) {
      checkbox.parentElement.style.color = "green";
    } else {
      checkbox.parentElement.style.color = "red";
    }

  })
  .catch(() => {
    checkbox.checked = !checkbox.checked;
    alert("Error occurred");
  });
}