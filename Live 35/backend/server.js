import express from 'express'

const app = express()
app.use(express.json())

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

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
})