async function clicklupa() {
    const key_ia_grop = "gsk_dfgfgfd"

    const cidade = document.querySelector(".input-cidade").value;

    const caixa = document.querySelector(".caixa-media");

    if (!cidade) {
        alert("Digite o nome de uma cidade");
        return;
    }

    const endereco = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&units=metric&lang=pt_br`;
    const respostaServidor = await fetch(endereco);
    const dadosJson = await respostaServidor.json();

    caixa.innerHTML = `
        <h2 class="cidade">${dadosJson.name}</h2>
        <p class="temp">${Math.floor(dadosJson.main.temp)} °C</p>
        <img 
            class="icone" 
            src="https://openweathermap.org/img/wn/${dadosJson.weather[0].icon}@2x.png"
            alt="Ícone do clima"
        >
        <p class="descricao">${dadosJson.weather[0].description}</p>
        <p class="umidade">Umidade: ${dadosJson.main.humidity}%</p>
        <button class="botao-ia" onclick="pedirSugestaoRoupa()">Sugestão de Roupa</button>
        <p class="resposta-ia">Resposta da IA</p>
    `
}

async function clickmicrofone() {

    const reconhecimento = new window.webkitSpeechRecognition();
    reconhecimento.lang = "pt-BR";
    reconhecimento.start();

    reconhecimento.onresult = function (evento) {
        const textoTranscrito = evento.results[0][0].transcript;
        document.querySelector(".input-cidade").value = textoTranscrito;

        clicklupa();
    }
}

async function pedirSugestaoRoupa() {
    const temperatura = document.querySelector(".temp").textContent;
    const umidade = document.querySelector(".umidade").textContent;
    const cidade = document.querySelector(".cidade").textContent;

    let resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key_ia_grop}` 
        },
        body: JSON.stringify({model: "meta-llama/llama-4-maverick-17b-128e-instruct",
            messages: [
                {
                    "role": "user",
                    "content": `Me dê uma sugestão de qual roupa usar hoje.
                     Estou na cidade de: ${cidade}, a temperatudo atual é:
                     ${temperatura} e a umidade está em: ${umidade}.
                     Me dê sugestões em 2 frases curtas.`
                },
            ]
        })
    });

    const dados = await resposta.json();
    console.log(dados);
    document.querySelector(".resposta-ia").innerHTML = dados.choices[0].message.content;
    console.log(dados)
}