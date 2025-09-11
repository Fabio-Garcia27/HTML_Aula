import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const users = [{
  name: "Fábio Garcia",
  age: 53
}]

app.get('/usuarios', (req, res) => {
  res.json(users)
})

app.post('/usuarios', (req, res) => {

  const newUser = req.body

  users.push(newUser)

  res.status(201).json(newUser)
})

app.delete('/usuarios/:name', (req, res) => {
  const { name } = req.params
  // procurar usuário pelo name e deletar
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
})