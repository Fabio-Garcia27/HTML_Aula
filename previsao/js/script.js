const key = "915b5860b544b24d0cdde4f0c2ed8275";


async function clicklupa() {
    const cidade = document.querySelector(".input-cidade").value;

    const caixa = document.querySelector(".caixa-media");

    if (!cidade) {
        alert("Digite o nome de uma cidade");
        return;
    }

    const endereco = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&units=metric&lang=pt_br`;
    const respostaServidor = await fetch(endereco);
    const dadosJson =  await respostaServidor.json();

    caixa.innerHTML = `
        <h2 class="cidade">${dadosJson.name}</h2>
        <p class="temp">${Math.floor(dadosJson.main.temp)} °C</p>
        <img 
            class="icone" 
            src="https://openweathermap.org/img/wn/${dadosJson.weather[0].icon}@2x.png"
            alt="Ícone do clima"
        >
        <p class="descricao">${dadosJson.weather[0].description}</p>
        <p class="umidade">Umidade: ${dadosJson.main.humidity}</p>
        <button class="botao-ia">Sugestão de Roupa</button>
        <p class="resposta-ia">Resposta da IA</p>
    `

    console.log(dadosJson);

}

async function clickmicrofone() {
    alert("Função de microfone ainda não implementada 🎤");
}