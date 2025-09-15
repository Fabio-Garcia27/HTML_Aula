const valorReal = document.querySelector("input")

function converter() {

    document.querySelector("h1").style.color = "red"

    const valorConvertido = valorReal.value / 5

    alert(`O valor em dólar é ${valorConvertido} dólares`)
}

