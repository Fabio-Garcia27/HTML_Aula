import { buscarCriptos, buscarCambio } from '../api.js';
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
        const [criptos, cambio] = await Promise.all([
            buscarCriptos(),
            buscarCambio()
        ]);

        const moedas = [
            { nome: 'Bitcoin', preco: criptos.bitcoin.brl ?? 0 },
            { nome: 'Ethereum', preco: criptos.ethereum.brl ?? 0 },
            { nome: 'Cardano', preco: criptos.cardano.brl ?? 0 },
            { nome: 'Dogecoin', preco: criptos.dogecoin.brl ?? 0 },
            { nome: 'Litecoin', preco: criptos.litecoin.brl ?? 0 },
            { nome: 'Dólar', preco: cambio.usd ?? 0 },
            { nome: 'Euro', preco: cambio.eur ?? 0 },
            { nome: 'Libra', preco: cambio.gbp ?? 0 },            
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
