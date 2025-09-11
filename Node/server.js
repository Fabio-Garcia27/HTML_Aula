import express from "express"

const app = express()
app.use(express.json())

const users = [{
  name: "Fábio Garcia",
  age: 53
}]

app.get('/usuarios', (req, res) => {
  res.send(users)
})

app.post('/usuarios', (req, res) => {

  users.push(req.body)

  res.send(users)
})

app.delete('/usuarios/:id', (req, res) => {

  const id = req.params.id

  users.splice(id, 1)

  res.send("Usuário deletado com sucesso")
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
})

