import { useRef, useState } from 'react'
import { v4 } from 'uuid'
import { TrashIcon } from '@heroicons/react/24/solid';

function App() {

  const inputRef = useRef()
  const [produtos, setProdutos] = useState([])

  function cliqueNoBotao() {
    if (!inputRef.current.value.trim()) return; // evita adicionar vazio    

    setProdutos([{ id: v4(), nome: inputRef.current.value }, ...produtos])

    // limpa o input
    inputRef.current.value = ""
    inputRef.current.focus() // opcional: já deixa o cursor de volta no input    
  }

  function cliqueNoDeletar(id) {
    setProdutos(produtos.filter(produto => produto.id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gray-100 flex flex-col items-center p-6 border-4 border-gray-400 rounded-md shadow-lg">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Lista de Tarefas</h1>

      {/* Input e botão lado a lado */}
      <div className="flex w-full mb-6 space-x-2">
        <input
          placeholder="produto..."
          ref={inputRef}
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={cliqueNoBotao}
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Adicionar
        </button>
      </div>

      {/* Lista de produtos */}
      <div className="w-full space-y-2">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="flex justify-between items-center bg-white rounded shadow px-4 py-2 border border-gray-300"
          >
            <p>{produto.nome}</p>
            <button onClick={() => cliqueNoDeletar(produto.id)} className="text-red-600 hover:text-red-800 cursor-pointer">
              <TrashIcon className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
