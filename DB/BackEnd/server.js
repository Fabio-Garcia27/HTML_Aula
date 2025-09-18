const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Criar usuário
app.post('/usuarios', async (req, res) => {
  const { name, email, fone } = req.body ?? {};

  if (!name || !email || !fone) {
    return res.status(400).json({ erro: 'Nome, email e fone são obrigatórios' });
  }

  try {
    const user = await prisma.user.create({
      data: { name, email, fone },
    });
    return res.status(201).json({ mensagem: 'Usuário criado com sucesso', usuario: user });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao criar usuário', detalhe: error.message });
  }
});

// Listar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuários', detalhe: error.message });
  }
});

// Buscar usuário por ID
app.get('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id }, // Se id for string (cuid)
    });

    if (!user) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: error.message });
  }
});

// Atualizar usuário por ID
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, fone } = req.body ?? {};

  if (!name || !email || !fone) {
    return res.status(400).json({ erro: 'Nome, email e fone são obrigatórios' });
  }

  try {
    // Verificar se o usuário existe
    const userExist = await prisma.user.findUnique({ where: { id } });
    if (!userExist) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const user = await prisma.user.update({
      where: { id: id },
      data: { name, email, fone },
    });
    return res.json({ mensagem: 'Usuário atualizado com sucesso', usuario: user });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhe: error.message });
  }
});

// Remover usuário por ID
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: { id: id },
    });
    return res.json({ mensagem: 'Usuário removido com sucesso', usuario: user });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao remover usuário', detalhe: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
