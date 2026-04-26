<!DOCTYPE html>
<html>

<head>
  <title>Loans</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
</head>

<body>

  <div class="container-fluid">
    <div class="row">

      <?php include 'partials/sidebar.php'; ?>

      <div class="col-md-10 content">

        <h4>Loans</h4>
        <hr>

        <!-- SELECT MEMBER -->
        <div class="row mb-3">
          <div class="col-md-4">
            <select id="memberSelect" class="form-control">
              <option value="">Select Member</option>
            </select>
          </div>
        </div>

        <!-- MEMBER DETAILS -->
        <div class="row mb-3">

          <div class="col-md-3">
            <label>Member Name</label>
            <input id="memberName" class="form-control" disabled>
          </div>

          <div class="col-md-3">
            <label>Total Contributed</label>
            <input id="totalContributed" class="form-control" disabled>
          </div>

          <div class="col-md-3">
            <label>Allowed to Borrow</label>
            <input id="allowedAmount" class="form-control text-success" disabled>
          </div>

          <div class="col-md-3">
            <label>Loan Amount</label>
            <input id="loanAmount" class="form-control">
          </div>

        </div>

        <!-- LOAN ACTION -->
        <div class="row mb-4">
          <div class="col-md-3">
            <button class="btn btn-success w-100" onclick="createLoan()">Give Loan</button>
          </div>
        </div>

        <!-- LOANS TABLE -->
        <div class="card p-3">
          <h5>Active Loans</h5>

          <table class="table table-bordered" id="loanTable">
            <thead>
              <tr>
                <th>Member</th>
                <th>Requested (Return)</th>
                <th>Given</th>
                <th>Interest</th>
                <th>Total Pay</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
  <script src="js/loans.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>