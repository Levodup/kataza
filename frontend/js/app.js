const API = "../backend/api/";

let members = [];

function loadMembers() {
  fetch(API + "members.php")
    .then((res) => res.json())
    .then((data) => {
      members = data;

      let html = "";

      data.forEach((m) => {
        html += `
          <tr>
            <td>${m.name}</td>
            <td><input value="20000" class="form-control amount"></td>
            <td><input type="checkbox" checked class="paid"></td>
          </tr>
        `;
      });

      document.querySelector("#table tbody").innerHTML = html;
    });
}

function addMember() {
  fetch(API + "members.php", {
    method: "POST",
    body: JSON.stringify({
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        alert(res.message);
        return;
      }

      alert("Member added");
      loadMembers();
    });
}

function saveContributions() {
  let week = document.getElementById("week").value;
  let year = document.getElementById("year").value;

  let rows = document.querySelectorAll("#table tbody tr");

  let payload = [];

  rows.forEach((row, i) => {
    payload.push({
      member_id: members[i].id,
      amount: row.querySelector(".amount").value,
      week: week,
      year: year,
      paid: row.querySelector(".paid").checked ? 1 : 0,
    });
  });

  fetch(API + "contributions.php", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  .then((res) => res.json())
  .then((res) => {
    if (!res.status) {
      alert(res.message);
      return;
    }

    alert("Saved successfully");
  });
}

loadMembers();

const table = document.getElementById("table");

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
