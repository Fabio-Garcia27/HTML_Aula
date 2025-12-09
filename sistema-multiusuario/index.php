<?php session_start(); ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #dbe9f6;
            min-height: 100vh;
        }
        .login-card {
            max-width: 350px;
            margin: 60px auto;
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
            background: #fff;
            padding: 32px 24px 24px 24px;
        }
        .login-avatar {
            width: 72px;
            height: 72px;
            background: #e3eaf2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px auto;
        }
        .login-avatar svg {
            width: 40px;
            height: 40px;
            color: #4a6fa1;
        }
        .form-control:focus {
            box-shadow: 0 0 0 0.2rem rgba(74,111,161,.15);
            border-color: #4a6fa1;
        }
        .btn-primary {
            background-color: #4a86c5;
            border: none;
        }
        .btn-primary:hover {
            background-color: #3a6fa1;
        }
        .form-check-label {
            font-size: 0.95rem;
        }
        .forgot-link {
            display: block;
            text-align: center;
            margin-top: 16px;
            color: #4a6fa1;
            text-decoration: none;
            font-size: 0.97rem;
        }
        .forgot-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="d-flex justify-content-center align-items-center min-vh-100">
        <div class="login-card">
            <div class="login-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fill-rule="evenodd" d="M8 9a5 5 0 0 0-5 5v.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14a5 5 0 0 0-5-5z"/>
                </svg>
            </div>
            <h3 class="text-center mb-4">LOGIN</h3>
            <?php if(isset($_SESSION['erro'])): ?>
                <div class="alert alert-danger py-2" role="alert">
                    <?php echo $_SESSION['erro']; unset($_SESSION['erro']); ?>
                </div>
            <?php endif; ?>
            <form method="post" action="processa_login.php">
                <div class="mb-3">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                        <input type="email" class="form-control" name="email" placeholder="Email" required autofocus>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-lock"></i></span>
                        <input type="password" class="form-control" name="senha" placeholder="Senha" required>
                    </div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember" name="remember">
                    <label class="form-check-label" for="remember">Lembrar-me</label>
                </div>
                <button type="submit" class="btn btn-primary w-100">ENTRAR</button>
            </form>
            <a href="#" class="forgot-link">Esqueceu a senha?</a>
        </div>
    </div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
</body>
</html> 