<!DOCTYPE html>
<html>

<head>
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../assets/icons/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="192x192" href="../assets/icons/android-icon-192x192.png">

  <link rel="apple-touch-icon" sizes="180x180" href="../assets/icons/apple-touch-icon.png">

  <meta name="theme-color" content="#0d6efd">
  <title>Proof Report</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
</head>

<body>

  <div class="container-fluid">
    <div class="row">

      <?php include 'partials/sidebar.php'; ?>

      <div class="col-md-10 content">

        <div class="d-flex justify-content-between mb-3">
          <h4>Proof of Contribution Report</h4>

          <a href="../backend/api/proof_report_pdf.php" target="_blank" class="btn btn-danger">
            Download PDF
          </a>
        </div>

        <hr>

        <div class="table-responsive" style="max-height: 87vh;">
          <table class="table table-bordered" id="proofReportTable">
            <thead class="table-dark">
              <tr>
                <th>Member</th>
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

  <script src="js/proof_report.js"></script>

</body>

</html>