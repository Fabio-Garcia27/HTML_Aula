<?php
// Verifica se o usuário está logado e se é usuário comum
session_start();
if (!isset($_SESSION['id']) || $_SESSION['nivel'] != 'user') {
    header('Location: index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Usuário</title>
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
        .box-chart {
            max-width: 520px;
            height: 240px;
            margin: 0 auto 24px auto;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03);
            padding: 20px 18px 18px 18px;
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
            <h4 class="mb-4">USUÁRIO</h4>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <a href="#" class="nav-link active"><i class="bi bi-house-door-fill"></i> Dashboard</a>
                </li>
                <li>
                    <a href="#" class="nav-link"><i class="bi bi-person"></i> Meu Perfil</a>
                </li>
            </ul>
            <a href="#" class="logout mt-auto nav-link"><i class="bi bi-power"></i> Sair</a>
        </nav>
        <!-- Main Content -->
        <div class="d-flex flex-column w-100 m-5">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="fw-bold mb-0">Dashboard</h2>
                <div class="d-flex align-items-center gap-3">
                    <input type="text" class="form-control search-bar" placeholder="Buscar">
                    <button class="profile-btn"><i class="bi bi-person"></i></button>
                </div>
            </div>
            <div class="row g-3 mb-4">
                <div class="col-md-3">
                    <div class="card-metric metric-blue">
                        <span class="icon"><i class="bi bi-bag"></i></span>
                        <div>
                            <div style="font-size: 1.1rem;">Pedidos</div>
                            <div style="font-size: 1.5rem; font-weight: bold;">12</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card-metric metric-green">
                        <span class="icon"><i class="bi bi-chat-dots"></i></span>
                        <div>
                            <div style="font-size: 1.1rem;">Mensagens</div>
                            <div style="font-size: 1.5rem; font-weight: bold;">3</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card-metric metric-orange">
                        <span class="icon"><i class="bi bi-bell"></i></span>
                        <div>
                            <div style="font-size: 1.1rem;">Notificações</div>
                            <div style="font-size: 1.5rem; font-weight: bold;">5</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card-metric metric-red">
                        <span class="icon"><i class="bi bi-life-preserver"></i></span>
                        <div>
                            <div style="font-size: 1.1rem;">Suporte</div>
                            <div style="font-size: 1.5rem; font-weight: bold;">1</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="box-chart col-4">
                    <h5 class="fw-bold mb-3">Pedidos por mês</h5>
                    <canvas id="mainChart" height="80"></canvas>
                </div>
                <div class="col-8">
                    <div class="box">
                        <h5 class="fw-bold mb-3">Meus Pedidos</h5>
                        <div class="table-responsive">
                            <table class="table mb-0">
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Pedido</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>10/06/2024</td>
                                        <td>#1001</td>
                                        <td><span class="badge bg-success">Entregue</span></td>
                                    </tr>
                                    <tr>
                                        <td>05/06/2024</td>
                                        <td>#1000</td>
                                        <td><span class="badge bg-warning text-dark">Em andamento</span></td>
                                    </tr>
                                    <tr>
                                        <td>01/06/2024</td>
                                        <td>#0999</td>
                                        <td><span class="badge bg-danger">Cancelado</span></td>
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
        // Gráfico simples para o usuário
        const ctx = document.getElementById('mainChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Pedidos',
                    data: [2, 3, 1, 4, 2, 5],
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