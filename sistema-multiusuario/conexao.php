<?php
// conexao.php
// Arquivo responsável por conectar ao banco de dados MySQL

$host = "localhost"; // Host do banco
$usuario = "root"; // Usuário do banco
$senha = ""; // Senha do banco
$banco = "sistema_multiusuarios"; // Nome do banco de dados

// Cria a conexão
$conn = mysqli_connect($host, $usuario, $senha, $banco);

// Verifica se houve erro na conexão
if (!$conn) {
    die("Falha na conexão: " . mysqli_connect_error());
}
?> 