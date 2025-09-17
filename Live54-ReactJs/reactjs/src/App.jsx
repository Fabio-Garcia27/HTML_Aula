import { useRef } from 'react'

function App() {

  const inputRef = useRef()

  let produtos = []

  function cliqueNoBotao() {
    produtos.push(inputRef.current.value)
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <input placeholder="produto..." ref={inputRef}/>
      <button onClick={cliqueNoBotao}>Adicionar</button>
    </div>
  )
}

export default App
