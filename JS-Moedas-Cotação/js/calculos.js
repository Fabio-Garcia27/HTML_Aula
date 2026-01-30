export function formatarPreco(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

export function filtrarMoedas(moedas, textoBusca) {
    if (!textoBusca) return moedas;

    const resultado = [];
    for (let moeda of moedas) {
        if (moeda.nome.toLowerCase().includes(textoBusca.toLowerCase())) {
            resultado.push(moeda);
        }
    }
    return resultado;
}
