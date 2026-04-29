<!DOCTYPE html>
<html>
<!-- /frontend/contributions.php -->

<head>
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../assets/icons/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="192x192" href="../assets/icons/android-icon-192x192.png">

  <link rel="apple-touch-icon" sizes="180x180" href="../assets/icons/apple-touch-icon.png">

  <meta name="theme-color" content="#0d6efd">
  <title>Contributions</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
</head>

<body>

  <div class="container-fluid">
    <div class="row">

      <?php include 'partials/sidebar.php'; ?>

      <div class="col-md-10 content">

        <div class="d-flex justify-content-between mb-3">
          <h4>Contributions</h4>

        </div>

        <hr>

        <!-- SELECT MEMBER -->
        <div class="row mb-3">
          <div class="col-md-3 mr-2">
            <select id="memberSelect" class="form-control">
              <option value="">Select Member</option>
            </select>
          </div>
          <div class="col-md-2">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#memberModal">
              + Add Member
            </button>
          </div>
          <div class="col-md-2">
            <button class="btn btn-info mb-3" data-bs-toggle="modal" data-bs-target="#proofModal">
              + Proof of Contribution
            </button>
          </div>
        </div>

        <!-- CONTRIBUTION INPUT -->
        <div class="row mb-3">

          <div class="col-md-3">
            <label>Member</label>
            <input id="memberName" class="form-control" disabled>
          </div>

          <div class="col-md-3">
            <label>Last Contribution</label>
            <input id="lastAmount" class="form-control" disabled>
          </div>

          <div class="col-md-3">
            <label>New Contribution</label>
            <input id="newAmount" class="form-control">
          </div>

          <div class="col-md-3">
            <label>Week</label>
            <select id="weekSelect" class="form-control"></select>
          </div>

          <div class="col-md-1 mt-4 d-flex align-items-end">
            <button class="btn btn-success w-100" onclick="saveContribution()">
              Save
            </button>
          </div>

        </div>

        <!-- WEEK GRID -->
        <div class="card p-3">
          <h5>Yearly Contributions</h5>
          <div id="weeksGrid" class="d-flex flex-wrap"></div>
        </div>

        <!-- PROOF OF PAYMENTS -->
        <div class="card mt-3 p-3">
          <h5>Proof of Payments</h5>

          <table class="table table-sm table-bordered" id="proofTable">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Weeks</th>
                <th>Mode</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- ADD MEMBER MODAL -->
  <div class="modal fade" id="memberModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5>Add Member</h5>
        </div>

        <div class="modal-body">
          <input id="name" class="form-control mb-2" placeholder="Name">
          <input id="phone" class="form-control" placeholder="Phone">
        </div>

        <div class="modal-footer">
          <button class="btn btn-primary" onclick="addMember()">Save</button>
        </div>

      </div>
    </div>
  </div>

  <!-- PROOF OF CONTRIBUTION MODAL -->
  <div class="modal fade" id="proofModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5>Proof of Contribution</h5>
        </div>

        <div class="modal-body">

          <!-- Member -->
          <select id="proofMember" class="form-control mb-2"></select>

          <!-- Amount -->
          <input id="proofAmount" class="form-control mb-2" placeholder="Amount">

          <!-- Ref -->
          <input id="proofRef" class="form-control mb-2" placeholder="Reference ID">

          <!-- Type -->
          <select id="proofType" class="form-control mb-2">
            <option value="1">Week</option>
            <option value="2">Month</option>
            <option value="3">Pay Loan</option>
            <option value="4">Loan + Week</option>
            <option value="5">Loan + Month</option>
          </select>

          <!-- Weeks Covered -->
          <input id="weeksCovered" class="form-control mb-2" placeholder="Weeks Covered">

          <!-- Payment Mode -->
          <select id="paymentMode" class="form-control">
            <option value="1">Agent</option>
            <option value="2">MoMo</option>
            <option value="3">App</option>
            <option value="4">Someone paid</option>
            <option value="5">Bulk payment</option>
          </select>

          <!-- Payment Date & Time -->
          <div class="mb-2">
            <label>Payment Date & Time</label>
            <input type="datetime-local" id="paymentDatetime" class="form-control">
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-success" onclick="saveProof()">Save</button>
        </div>

      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/contributions.js"></script>
</body>

</html>