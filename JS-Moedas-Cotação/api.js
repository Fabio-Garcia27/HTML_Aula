const CRIPTOS = ['bitcoin', 'ethereum', 'cardano', 'dogecoin', 'litecoin'];

const API_CRIPTO = 'https://api.coingecko.com/api/v3/simple/price';

export async function buscarCriptos() {
    const ids = CRIPTOS.join(',');
    const url = `${API_CRIPTO}?ids=${ids}&vs_currencies=brl`;

    const response = await fetch(url);
    const dados = await response.json();

    return dados;
}


const API_CAMBIO = 'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL';

export async function buscarCambio() {
    const response = await fetch(API_CAMBIO);
    const dados = await response.json();

    return {
        usd: Number(dados.USDBRL.bid),
        eur: Number(dados.EURBRL.bid),
        gbp: Number(dados.GBPBRL.bid)
    };
}
