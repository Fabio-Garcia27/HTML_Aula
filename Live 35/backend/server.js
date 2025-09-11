import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const usuariosArray = []

/*
const users = [{
  name: "Fábio Garcia",
  age: 53
}]
*/

// GET /usuarios
app.get('/usuarios', (req, res) => {
  // deve retornar array
  res.json(usuariosArray)
})

// POST /usuarios
app.post('/usuarios', (req, res) => {
  const { name, age } = req.body

  if (!name || !age) return res.status(400).json({ error: 'Campos obrigatórios' })

  const newUser = { id: Date.now(), name, age }

  usuariosArray.push(newUser)

  res.json(newUser) // <- importante enviar resposta
})

// DELETE
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const index = usuariosArray.findIndex(u => u.id === id)

  if (index === -1) return res.status(404).json({ error: 'Usuário não encontrado' })

  usuariosArray.splice(index, 1)
  
  res.status(204).send()
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
})