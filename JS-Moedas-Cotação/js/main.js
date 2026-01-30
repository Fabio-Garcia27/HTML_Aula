import { buscarPrecos } from '../api.js';
import { formatarPreco, filtrarMoedas } from './calculos.js';

let moedas = [];

function renderizar(lista) {
    document.getElementById('listaMoedas').innerHTML = lista.map(({ nome, preco }) => `
        <div class="moeda">
            <h3>${nome}</h3>
            <p class="preco">${formatarPreco(preco)}</p>
        </div>
    `).join('');
}

async function atualizar() {
    try {
        const dados = await buscarPrecos();

        //console.log(dados); // 👈 ESSENCIAL

        moedas = [
            { nome: 'bitcoin', preco: dados.bitcoin?.brl ?? 0 },
            { nome: 'ethereum', preco: dados.ethereum?.brl ?? 0 },
            { nome: 'cardano', preco: dados.cardano?.brl ?? 0 },
            { nome: 'dogecoin', preco: dados.dogecoin?.brl ?? 0 },
            { nome: 'litecoin', preco: dados.litecoin?.brl ?? 0 },
            { nome: 'dólar', preco: dados.usd?.brl ?? 0 }         
        ];

        renderizar(moedas);
    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro ao buscar dados: ' + erro.message);
    }
}

document.getElementById('btnAtualizar').addEventListener('click', atualizar);
document.getElementById('filtro').addEventListener('input', (e) => {
    renderizar(filtrarMoedas(moedas, e.target.value));
});

atualizar();
