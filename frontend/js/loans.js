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

      let options = '<option value="">Select Member</option>';

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
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadMembers();
  loadLoans();

  document
    .getElementById("memberSelect")
    .addEventListener("change", handleMemberChange);
});

/* =========================
   MEMBER SELECT HANDLER
========================= */
function handleMemberChange() {
  let memberId = this.value;

  if (!memberId) return;

  let member = members.find((m) => m.id == memberId);

  /* ❌ BROKEN BEFORE:
     member could be undefined → crash
  */
  if (!member) {
    console.error("Member not found");
    return;
  }

  document.getElementById("memberName").value = member.name;

  fetch(API + "loans.php?member_id=" + memberId)
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        alert("Failed to load member data");
        return;
      }

      let data = res.data;

      let total = parseFloat(data.total_contributed || 0);
      let pending = parseFloat(data.pending_loan || 0);

      document.getElementById("totalContributed").value = total;

      let allowed = 0;

      /* ✔ Correct rule:
         Only allow if no pending loan
      */
      if (pending === 0) {
        allowed = total * 0.7;
      }

      document.getElementById("allowedAmount").value = allowed.toFixed(2);
    })
    .catch((err) => {
      console.error(err);
      alert("Error loading member data");
    });
}

/* =========================
   CREATE LOAN
========================= */
function createLoan() {
  let memberId = document.getElementById("memberSelect").value;
  let requested = parseFloat(document.getElementById("loanAmount").value);
  let allowed = parseFloat(document.getElementById("allowedAmount").value);

  /* ❌ BROKEN BEFORE:
     validation was outside function → never executed correctly
  */

  if (!memberId) {
    alert("Select a member");
    return;
  }

  if (!requested || requested <= 0) {
    alert("Enter valid amount");
    return;
  }

  if (requested > allowed) {
    alert("Requested exceeds allowed (" + allowed + ")");
    return;
  }

  fetch(API + "loans.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      member_id: memberId,
      amount: requested,
    }),
  })
    .then((res) => res.text()) // safer debugging
    .then((text) => {
      console.log("Raw response:", text);

      let res;

      try {
        res = JSON.parse(text);
      } catch (e) {
        alert("Server error (invalid JSON)");
        return;
      }

      if (!res.status) {
        alert(res.message || "Failed");
        return;
      }

      alert("Loan created");

      document.getElementById("loanAmount").value = "";

      loadLoans();
    })
    .catch((err) => {
      console.error(err);
      alert("Error creating loan");
    });
}

/* =========================
   LOAD LOANS TABLE
========================= */
function loadLoans() {
  fetch(API + "loans.php")
    .then((res) => res.json())
    .then((res) => {
      let data = res.data || [];

      let html = "";

      data.forEach((l) => {
        let requested = l.total_to_pay;
        let given = l.amount;
        let interest = l.interest;

        html += `
          <tr>
            <td>${l.name}</td>
            <td>${requested}</td>
            <td>${given}</td>
            <td>${interest}</td>
            <td>${l.total_to_pay}</td>
            <td>${l.due_date ?? "-"}</td>

            <td>
              <button class="btn btn-sm btn-warning" onclick="editLoan(${l.id}, ${l.amount})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteLoan(${l.id})">Delete</button>
            </td>
          </tr>
        `;
      });

      document.querySelector("#loanTable tbody").innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to load loans");
    });
}

/* =========================
   DELETE LOAN
========================= */
function deleteLoan(id) {
  if (!confirm("Delete this loan?")) return;

  fetch(API + "loans.php", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        alert("Delete failed");
        return;
      }

      loadLoans();
    })
    .catch((err) => {
      console.error(err);
      alert("Error deleting loan");
    });
}

/* =========================
   EDIT LOAN
========================= */
function editLoan(id, amount) {
  let newAmount = prompt("Enter new amount:", amount);

  if (!newAmount) return;

  newAmount = parseFloat(newAmount);

  if (!newAmount || newAmount <= 0) {
    alert("Invalid amount");
    return;
  }

  fetch(API + "loans.php", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      amount: newAmount,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        alert("Update failed");
        return;
      }

      loadLoans();
    })
    .catch((err) => {
      console.error(err);
      alert("Error updating loan");
    });
}
