<!DOCTYPE html>
<html>
<!-- frontend/report.php -->

<head>
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../assets/icons/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="192x192" href="../assets/icons/android-icon-192x192.png">

  <link rel="apple-touch-icon" sizes="180x180" href="../assets/icons/apple-touch-icon.png">

  <meta name="theme-color" content="#0d6efd">
  <title>Kataza Report</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
</head>

<body>

  <div class="container-fluid">
    <div class="row">

      <!-- SIDEBAR -->
      <?php include 'partials/sidebar.php'; ?>

      <!-- CONTENT -->
      <div class="col-md-10 content">

        <div id="reportContainer"> <!-- ✅ ADD THIS -->

          <div class="d-flex justify-content-between mb-3">
            <h4>Weekly Contribution Report</h4>

            <a href="../backend/api/report_pdf.php" class="btn btn-danger" target="_blank">
              Download PDF
            </a>
          </div>

          <hr>

          <h6 id="currentWeekLabel" class="text-muted mb-2"></h6>

          <div class="table-responsive">
            <table class="table table-bordered table-sm" id="reportTable">

              <thead class="table-dark">
                <tr></tr>
              </thead>

              <tbody></tbody>

            </table>
          </div>

        </div> <!-- ✅ END WRAPPER -->

      </div>
    </div>
  </div>

  <!-- JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

  <script src="js/report.js"></script>

</body>

</html>