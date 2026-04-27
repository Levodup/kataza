<!DOCTYPE html>
<html>
<!-- frontend/index.php -->

<head>
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../assets/icons/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="192x192" href="../assets/icons/android-icon-192x192.png">

  <link rel="apple-touch-icon" sizes="180x180" href="../assets/icons/apple-touch-icon.png">

  <meta name="theme-color" content="#0d6efd">
  <title>Kataza Dashboard</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
</head>

<body>

  <div class="container-fluid">
    <div class="row">

      <!-- INCLUDE SIDEBAR -->
      <?php include 'partials/sidebar.php'; ?>

      <!-- CONTENT -->
      <div class="col-md-10 content">

        <h4>Expenses</h4>

        <!-- FORM -->
        <div class="card p-3 mb-3">

          <div class="row">

            <div class="col-md-3">
              <select id="type" class="form-control">
                <option value="1">Bank Charges</option>
                <option value="2">Withdrawal Ticket</option>
              </select>
            </div>

            <div class="col-md-3">
              <input id="description" class="form-control" placeholder="Description">
            </div>

            <div class="col-md-2">
              <input id="amount" class="form-control" placeholder="Amount">
            </div>

            <div class="col-md-2">
              <input type="date" id="date" class="form-control">
            </div>

            <div class="col-md-2">
              <button class="btn btn-success w-100" onclick="saveExpense()">Save</button>
            </div>

          </div>

        </div>

        <!-- LIST -->
        <table class="table table-bordered" id="expenseTable">
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>

      </div>


    </div>
  </div>
  </div>

  <script src="js/expenses.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>