const form = document.getElementById("form-gasto");
const listaGastos = document.getElementById("lista-gastos");
const totalSpan = document.getElementById("total");

async function carregarGastos() {
    const resposta = await fetch("/api/gastos");
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
    const periodo = document.getElementById("periodo").value;
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const valor = document.getElementById("valor").value;

    await fetch("/api/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ periodo, descricao, categoria, valor })
    });

    form.reset();
    carregarGastos();
});

listaGastos.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains("excluir")) {
        await fetch(`/api/gastos/${id}`, { method: "DELETE" });
        carregarGastos();
    }

    if (e.target.classList.contains("editar")) {
        const gasto = await fetch(`/api/gastos`).then(r => r.json()).then(g => g.find(x => x.id === id));
        document.getElementById("periodo").value = gasto.periodo;
        document.getElementById("descricao").value = gasto.descricao;
        document.getElementById("categoria").value = gasto.categoria;
        document.getElementById("valor").value = gasto.valor;
        await fetch(`/api/gastos/${id}`, { method: "DELETE" });
        carregarGastos();
    }
});

carregarGastos();



