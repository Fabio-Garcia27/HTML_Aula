const usuario = {
    nome: 'João',
    idade: 25,
    cidade: 'Tupã',
    profissao: 'Programador',
    rua: 'A',
    numero: 0,
    cpf: '111.111.111-11',
    rg: '111.111.111-1'
}

const { cidade, cpf, rua} = usuario

console.log(cpf)


const cores = ['azul', 'amarelo', 'vermelho', 'roxo'] 

const [primeira, segunda, quarta] = cores


console.log(primeira)
console.log(quarta)