fetch('http://localhost:3000/salvar_gasto', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ descricao, valor })
});