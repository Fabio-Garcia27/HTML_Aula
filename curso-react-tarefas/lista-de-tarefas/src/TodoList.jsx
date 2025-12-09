import React from "react";
import './TodoList.css';

function TodoList() {
    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form>
                <input 
                    type="text"
                    placeholder="Adicione uma Tarefa"
                />  
                <button className="add" type="submit">Adicionar</button> 
            </form>
            <div className="listaTarefas">
                <div className="item">
                    <span>Tarefa de Exemplo</span>
                    <button className="del">Deletar</button>
                </div>
                <div className="item completo">
                    <span>Tarefa de Exemplo</span>
                    <button className="del">Deletar</button>
                </div>  
                <button className="deleteAll">Deletar Todas</button>              
            </div>
        </div>
    )
}

export default TodoList