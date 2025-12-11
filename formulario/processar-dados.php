<?php

$nome = $_POST['nome'];
$email = $_POST['email'];
$mensagem = $_POST['$mensagem'];

$server = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'aula_formulario';

$conn = new mysqli($server, $usuario, $senha, $banco);