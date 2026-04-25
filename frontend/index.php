<!DOCTYPE html>
<html>

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

      </div>
    </div>
  </div>

</body>

</html>