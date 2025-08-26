const form = document.getElementById("form-gasto");
const listaGastos = document.getElementById("lista-gastos");
const totalSpan = document.getElementById("total");
const formBusca = document.getElementById("form-busca");
const inputPeriodoBusca = document.getElementById("periodo-busca");

async function carregarGastos(periodo) {

    if (!periodo) {
        // Nenhum período informado → não mostrar nada
        listaGastos.innerHTML = "";
        totalSpan.textContent = "0.00";
        return;
    }

    const resposta = await fetch(`/api/gastos?periodo=${encodeURIComponent(periodo)}`);
    const gastos = await resposta.json();
    listaGastos.innerHTML = "";
    let total = 0;

    gastos.forEach(gasto => {
        const li = document.createElement("li");
        li.classList.add("border-b", "py-2", "flex", "justify-between", "items-center");
        li.innerHTML = `
            <span>${gasto.descricao} - ${gasto.categoria} (${gasto.periodo})</span>
            <div>
                <span class="mr-2">R$ ${parseFloat(gasto.valor).toFixed(2)}</span>
                <button data-id="${gasto.id}" class="editar bg-yellow-500 text-white px-2 py-1 rounded mr-1">Editar</button>
                <button data-id="${gasto.id}" class="excluir bg-red-500 text-white px-2 py-1 rounded">Excluir</button>
            </div>
        `;
        listaGastos.appendChild(li);
        total += parseFloat(gasto.valor);
    });


    totalSpan.textContent = total.toFixed(2);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    //const periodo = document.getElementById("periodo").value;
    const periodo = document.getElementById("periodo").value.trim(); // "08/2025"
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const valor = document.getElementById("valor").value;

    const resposta = await fetch("/api/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ periodo, descricao, categoria, valor })
    });

    const gastoCriado = await resposta.json();

    // Adicionar no fim da lista atual
    const li = document.createElement("li");
    li.classList.add("border-b", "py-2", "flex", "justify-between", "items-center");
    li.innerHTML = `
        <span>${gastoCriado.descricao} - ${gastoCriado.categoria} (${gastoCriado.periodo})</span>
        <div>
            <span class="mr-2">R$ ${parseFloat(gastoCriado.valor).toFixed(2)}</span>
            <button data-id="${gastoCriado.id}" class="editar bg-yellow-500 text-white px-2 py-1 rounded mr-1">Editar</button>
            <button data-id="${gastoCriado.id}" class="excluir bg-red-500 text-white px-2 py-1 rounded">Excluir</button>
        </div>
    `;
    listaGastos.appendChild(li);

    totalSpan.textContent = (parseFloat(totalSpan.textContent) + parseFloat(gastoCriado.valor)).toFixed(2);

    form.reset();
});

formBusca.addEventListener("submit", e => {
    e.preventDefault();
    const periodo = inputPeriodoBusca.value.trim();
    carregarGastos(periodo);
});



