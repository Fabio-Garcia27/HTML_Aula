import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

//Conectar com servidor BackEnd
const api = axios.create({
  baseURL: 'http://localhost:3000'
})

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  // Buscar usuários ao carregar
  useEffect(() => {
    api.get('/usuarios').then(res => {
        setUsers(Array.isArray(res.data) ? res.data : res.data.usuarios || [])
      })
      .catch(err => console.error("Erro ao buscar usuários:", err))
  }, [])

  // Adicionar usuário
  function newUser() {
    if (!name || !age) return alert("Preencha todos os campos!")

    api.post('/usuarios', { name, age }).then(res => {
        setUsers(prev => [...prev, res.data]) // adiciona usuário retornado pelo backend
        setName('')  // Limpa campo Nome
        setAge('')   // Limpa campo Idade
    })
      .catch(err => console.error("Erro ao adicionar usuário:", err))
  }

  // Deletar usuário usando ID único
  function deleteUser(id) {
    api.delete(`/usuarios/${id}`).then(() => {
        setUsers(prev => prev.filter(user => user.id !== id))
      })
      .catch(err => console.error("Erro ao deletar usuário:", err))
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-lg">
      <h1 className="text-2xl bg-blue-600 text-white p-4 shadow-md font-bold text-center">Usuários Cadastrados</h1>
      <ul className="text-xl font-bold text-center">
        {users.map((user, index) => (
          <li key={`${user.id || "user"}-${index}`} className="flex justify-between items-center my-2">
            <span>Nome: {user.name} - Idade: {user.age}</span>
            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl bg-blue-600 text-white p-2 shadow-md font-bold text-center">Adicionar Novo Usuário</h2>
      <input
        placeholder='Nome'
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="px-3 py-2 border border-black shadow-md mb-2 w-full"
      />
      <input
        placeholder='Idade'
        value={age}
        onChange={(event) => setAge(event.target.value)}
        className="px-3 py-2 border border-black shadow-md mb-2 w-full"
      />
      <button onClick={newUser} className="bg-blue-500 text-white py-2 px-8 shadow-md hover:bg-blue-600 w-full">Adicionar Usuário</button>
    </div>
  )
}

export default App
