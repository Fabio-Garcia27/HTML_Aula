import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json()) // <-- precisa estar antes das rotas
app.use(cors())

let usuarios = []

//Criar usuário
app.post('/usuarios', (req, res) => {
  //console.log('POST /usuarios body:', req.body) // debug

  // Garantia segura caso req.body seja undefined
  const { name, email, fone } = req.body ?? {}

  if (!name || !email || !fone) {
    return res.status(400).json({ erro: 'Nome, email e fone são obrigatórios' })
  }
  //Criar usuário com id - necessário para controle dos dados
  const user = { id: Date.now(), name, email, fone }
  usuarios.push(user)

  //console.log('Usuário criado:', novoUsuario) // debug
  return res.status(201).json({ mensagem: 'Usuário criado com sucesso', usuario: user })
})

// Listar todos os usuários
app.get('/usuarios', (req, res) => {
  console.log('GET /usuarios')
  res.json(usuarios)
})

// Buscar usuário por ID
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params
  const usuario = usuarios.find(u => u.id === Number(id))

  if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' })
  }

  res.json(usuario)
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})






