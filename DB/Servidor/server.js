import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

let usuarios = []

app.post('/usuarios', (req, res) => {
    const { nome, email, fone } = req.body

    if (!nome || !email || !fone) {
    return res.status(400).json({ erro: 'Nome, email e fone são obrigatórios' });

    // Aqui você poderia salvar no banco de dados
    const novoUsuario = { id: Date.now(), nome, email };

    return res.status(201).json({ mensagem: 'Usuário criado com sucesso', usuario: novoUsuario });
}

})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})





