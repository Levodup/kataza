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
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
        <div class="card">
          <div class="row p-3">
            <div class="col-md-3">
              <div class="card p-3 text-center">
    
                <h3 id="expectedYearAmount" style="color:green;"></h3>
    
                <h5 id="weeksLeft" style="color:blue;"></h5>
    
                <small>Started: 05-01-2026</small>
    
                <h4 class="mt-2 text-dark">Amount Expected this Year</h4>
    
              </div>
            </div>
    
            <div class="col-md-2">
              <div class="card p-3 text-center">
                <h5>Total Contributions</h5>
                <h3 id="totalContributions" class="text-success"></h3>
              </div>
            </div>
      
            <div class="col-md-2">
              <div class="card p-3 text-center">
                <h5>Total Expenses</h5>
                <h3 id="totalExpenses" class="text-danger"></h3>
              </div>
            </div>
      
            <div class="col-md-2">
              <div class="card p-3 text-center">
                <h5>Net Savings</h5>
                <h3 id="netSavings" class="text-primary"></h3>
              </div>
            </div>
      
            <div class="col-md-2">
              <div class="card p-3 text-center">
                <h5>Loans Given</h5>
                <h3 id="totalLoans"></h3>
              </div>
            </div>
          </div>
        </div>
  
        <br>
  
        <div class="card p-3">
          <h5>Progress</h5>
          <div class="progress">
            <div id="progressBar" class="progress-bar bg-success"></div>
          </div>
        </div>
  
        <canvas id="growthChart"></canvas>
      </div>

    </div>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

  <script src="js/dashboard.js"></script>
  <script src="js/contributions.js"></script>
</body>

</html>