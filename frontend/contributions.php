<!DOCTYPE html>
<html>
<!-- /frontend/contributions.php -->

<head>
  <title>Contributions</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
</head>

<body>

  <div class="container-fluid">
    <div class="row">

      <?php include 'partials/sidebar.php'; ?>

      <div class="col-md-10 content">

        <div class="d-flex justify-content-between mb-3">
          <h4>Contributions</h4>

          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#memberModal">
            + Add Member
          </button>
        </div>

        <hr>

        <!-- SELECT MEMBER -->
        <div class="row mb-3">
          <div class="col-md-4">
            <select id="memberSelect" class="form-control">
              <option value="">Select Member</option>
            </select>
          </div>
        </div>

        <!-- CONTRIBUTION INPUT -->
        <div class="row mb-3">

          <div class="col-md-3">
            <label>Last Contribution</label>
            <input id="lastAmount" class="form-control" disabled>
          </div>

          <div class="col-md-3">
            <label>New Contribution</label>
            <input id="newAmount" class="form-control">
          </div>

          <div class="col-md-3">
            <label>Week</label>
            <select id="weekSelect" class="form-control"></select>
          </div>

          <div class="col-md-3 d-flex align-items-end">
            <button class="btn btn-success w-100" onclick="saveContribution()">
              Save
            </button>
          </div>

        </div>

        <!-- WEEK GRID -->
        <div class="card p-3">
          <h5>Yearly Contributions</h5>
          <div id="weeksGrid" class="d-flex flex-wrap"></div>
        </div>

      </div>
    </div>
  </div>

</body>

</html>