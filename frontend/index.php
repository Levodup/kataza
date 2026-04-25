<!DOCTYPE html>
<html>
<!-- frontend/index.php -->

<head>
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

        <div class="d-flex justify-content-between mb-3">
          <h4>Dashboard</h4>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#memberModal">
            + Add Member
          </button>
        </div>

        <hr>

        <!-- YOUR CARDS + TABLE HERE -->

        <div class="col-md-3">
          <div class="card p-3 text-center">

            <h3 id="expectedYearAmount" style="color:green;"></h3>

            <h5 id="weeksLeft" style="color:blue;"></h5>

            <small>Started: 05-01-2026</small>

            <h4 class="mt-2 text-dark">Amount Expected this Year</h4>

          </div>
        </div>

      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

  <script src="js/dashboard.js"></script>
  <script src="js/contributions.js"></script>
</body>

</html>