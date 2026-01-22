function enviarWhats(event) {
    event.preventDefault(); // evita reload do formulário

    const nome = document.getElementById('nome').value;

    const mensagem = document.getElementById('mensagem').value;

    const telefone = '5544997220216';

    const texto = `Olá! Me chamo ${nome} e ${mensagem}`;

    // função que formata o texto para mensagem no Whatsapp que não aceita espaço
    const msgFormatada = encodeURIComponent(texto);

    const url = `https://whatsa.me/${telefone}/?t=${msgFormatada}`;

    window.open(url, '_blank');
}