<?php
// painel-adm.php
// Verifica se o usuário está logado e se é administrador
session_start();
if (!isset($_SESSION['id']) || $_SESSION['nivel'] != 'adm') {
    header('Location: index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <style>
        body {
            background: #f7fafd;
        }
        .sidebar {
            min-height: 100vh;
            background: #2d3a45;
            color: #fff;
            width: 230px;
        }
        .sidebar .nav-link {
            color: #cfd8dc;
            font-weight: 500;
            border-radius: 8px;
            margin-bottom: 6px;
        }
        .sidebar .nav-link.active, .sidebar .nav-link:hover {
            background: #e9eef2;
            color: #2d3a45;
        }
        .sidebar .nav-link i {
            margin-right: 8px;
        }
        .sidebar .logout {
            margin-top: auto;
            color: #cfd8dc;
        }
        .sidebar .logout:hover {
            color: #ff5252;
        }
        .content {
            margin-left: 230px;
            padding: 32px 32px 0 32px;
            margin-top: 0;
        }
        @media (min-width: 992px) {
            .content {
                margin-left: 250px;
                padding-left: 48px;
                padding-right: 32px;
            }
        }
        .card-metric {
            display: flex;
            align-items: center;
            padding: 18px 22px;
            border-radius: 10px;
            color: #fff;
            font-weight: 500;
            margin-bottom: 18px;
        }
        .card-metric .icon {
            font-size: 2rem;
            margin-right: 16px;
        }
        .metric-blue { background: #3b7ddd; }
        .metric-green { background: #2dbd6e; }
        .metric-orange { background: #ff9800; }
        .metric-red { background: #f44336; }
        .search-bar {
            max-width: 260px;
        }
        .profile-btn {
            background: #e9eef2;
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .box {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03);
            padding: 20px 18px 18px 18px;
            margin-bottom: 24px;
        }
        .box-chart {
            max-width: 520px;
            height: 240px;
            margin: 0 auto 24px auto;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03);
            padding: 20px 18px 18px 18px;
        }
        .table > :not(caption) > * > * {
            background-color: transparent;
        }
        @media (max-width: 991.98px) {
            .sidebar { width: 100%; min-height: auto; }
            .content { margin-left: 0; padding: 16px; }
            .box-chart { max-width: 100%; }
        }
    </style>
</head>
<body>
    <div class="d-flex w-100">
        <!-- Sidebar -->
        <nav class="sidebar d-flex flex-column p-3">
            <h4 class="mb-4">ADMIN</h4>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <a href="#" class="nav-link active"><i class="bi bi-house-door-fill"></i> Dashboard</a>
                </li>
                <li>
                    <a href="#" class="nav-link"><i class="bi bi-person"></i> Profile</a>
                </li>
                <li>
                    <a href="#" class="nav-link"><i class="bi bi-gear"></i> Settings</a>
                </li>
            </ul>
            <a href="logout.php" class="logout mt-auto nav-link"><i class="bi bi-power"></i> Logout</a>
        </nav>
        <!-- Main Content -->
        <div class="d-flex flex-column w-100 m-5">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="fw-bold mb-0">Bem vindo, <?php echo $_SESSION['nome']; ?></h2>
                <div class="d-flex align-items-center gap-3">
                    <input type="text" class="form-control search-bar" placeholder="Search">
                    <button class="profile-btn"><i class="bi bi-person"></i></button>
                </div>
            </div>
            <div class="row g-3 mb-4">
                <div class="col-md-3">
                    <div class="card-metric metric-blue">
                        <span class="icon"><i class="bi bi-bar-chart"></i></span>
                        <div>
                            <div style="font-size: 1.1rem;">New</div>
                            <div style="font-size: 1.5rem; font-weight: bold;">150</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card-metric metric-green">
                        <span class="icon"><i class="bi bi-people"></i></span>
                        <div>
                            <div style="font-size: 1.1rem;">Users</div>
                            <div style="font-size: 1.5rem; font-weight: bold;">1.234</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card-metric metric-orange">
                        <span class="icon"><i class="bi bi-graph-up"></i></span>
                        <div>
                            <div style="font-size: 1.1rem;">Sales</div>
                            <div style="font-size: 1.5rem; font-weight: bold;">$ 540</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card-metric metric-red">
                        <span class="icon"><i class="bi bi-exclamation-circle"></i></span>
                        <div>
                            <div style="font-size: 1.1rem;">Tickets</div>
                            <div style="font-size: 1.5rem; font-weight: bold;">15</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
            <div class="box-chart col-4">
                <h5 class="fw-bold mb-3">Gráfico Geral</h5>
                <canvas id="mainChart" height="80"></canvas>
            </div>
            <div class="col-8">
                    <div class="box">
                        <h5 class="fw-bold mb-3">Recent Orders</h5>
                        <div class="table-responsive">
                            <table class="table mb-0">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Order ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Lorem ipsum</td>
                                        <td>AOCB1201</td>
                                    </tr>
                                    <tr>
                                        <td>Lorem ipsum</td>
                                        <td>AOCB1202</td>
                                    </tr>
                                    <tr>
                                        <td>Lorem ipsum</td>
                                        <td>AOCB1203</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
           
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.0/dist/chart.umd.min.js"></script>
    <script>
        // Gráfico simples para o dashboard
        const ctx = document.getElementById('mainChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Vendas',
                    data: [12, 19, 3, 5, 2, 3, 9],
                    backgroundColor: '#3b7ddd',
                    borderRadius: 8
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, grid: { color: '#e9eef2' } }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    </script>
</body>
</html> 