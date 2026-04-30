<?php
$current = basename($_SERVER['PHP_SELF']);
?>

<div class="col-md-2 sidebar d-flex flex-column">
    <div class="pentagon-bg">
    <span class="penta p1 shadow"></span>
    <span class="penta p2 shadow"></span>
    <span class="penta p2"></span>
    <span class="penta p3"></span>
    <span class="penta p4 shadow"></span>
    <span class="penta p5 shadow"></span>
  </div>
  <div class="logo mb-4 text-center position-relative" style="z-index:2;">
    <div class="pentagons-logo">
      <img src="../assets/logo.png" width="120" alt="Kataza Logo" class="img-fluid">
    </div>
    <!-- <div class="mt-2 fw-bold text-white">Kataza</div> -->
  </div>
  <div class="pentagon-bg">
    <span class="penta p1 shadow"></span>
    <span class="penta p2"></span>
    <span class="penta p3"></span>

  </div>
  <hr>

  <ul class="nav flex-column position-relative" style="z-index:2;">

    <li class="nav-item mb-2">
      <a class="nav-link text-white <?= $current == 'index.php' ? 'fw-bold' : '' ?>" href="index.php">
        📊 Dashboard
      </a>
    </li>

    <li class="nav-item mb-2">
      <a class="nav-link text-white <?= $current == 'contributions.php' ? 'fw-bold' : '' ?>" href="contributions.php">
        💰 Contributions
      </a>
    </li>

    <li class="nav-item mb-2">
      <a class="nav-link text-white <?= $current == 'loans.php' ? 'fw-bold' : '' ?>" href="loans.php">
        💸 Loans
      </a>
    </li>

    <li class="nav-item mb-2">
      <a class="nav-link text-white <?= $current == 'expenses.php' ? 'fw-bold' : '' ?>" href="expenses.php">
        <!-- emoji for usages -->
        🛒 Expenses
      </a>
    </li>

    <li class="nav-item mb-2">
      <a class="nav-link text-white <?= $current == 'report.php' ? 'fw-bold' : '' ?>" href="report.php">
        <!-- emoji for Reports -->
        📈 Reports
      </a>
    </li>
  </ul>
  <div class="pentagon-bg">
    <span class="penta p1 shadow"></span>
    <span class="penta p2 shadow"></span>
    <span class="penta p2"></span>
    <span class="penta p3"></span>
    <span class="penta p4 shadow"></span>
    <span class="penta p5 shadow"></span>
  </div>
</div>