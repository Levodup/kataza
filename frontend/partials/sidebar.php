<?php
$current = basename($_SERVER['PHP_SELF']);
?>

<div class="col-md-2 sidebar">
  <div class="logo mb-4">
    🦁 Kataza
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

  </ul>
</div>