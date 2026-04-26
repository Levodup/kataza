<?php
$current = basename($_SERVER['PHP_SELF']);
?>

<div class="col-md-2 sidebar">
  <div class="logo mb-4 text-center">
    <div class="pentagons-logo">
      <img src="../assets/logo.png" width="120" alt="Kataza Logo" class="img-fluid">
    </div>
    <!-- <div class="mt-2 fw-bold text-white">Kataza</div> -->
  </div>

  <hr>

  <ul class="nav flex-column">

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
      <a class="nav-link text-white <?= $current == 'loans.php' ? 'fw-bold' : '' ?>" href="loans.php">
        <!-- emoji for usages -->
        🛒 Expenses
      </a>
    </li>

    <li class="nav-item mb-2">
      <a class="nav-link text-white <?= $current == 'loans.php' ? 'fw-bold' : '' ?>" href="loans.php">
        <!-- emoji for Reports -->
        📈 Reports
      </a>
    </li>
  </ul>
</div>