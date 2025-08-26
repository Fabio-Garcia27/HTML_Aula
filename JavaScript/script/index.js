const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/salvar_gasto', async (req, res) => {
  const { descricao, periodo, categoria, valor } = req.body;
  if (!descricao || !valor || !periodo) return res.status(400).json({ erro: 'Dados inválidos' });

  const gasto = await prisma.gasto.create({
    data: { descricao, periodo, categoria, valor: parseFloat(valor) }
  });
  res.json(gasto);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));