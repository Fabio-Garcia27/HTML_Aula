    const form = document.getElementById('form-gasto');
    const lista = document.getElementById('lista-gastos');
    const totalSpan = document.getElementById('total');
    let total = 0;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const descricao = document.getElementById('descricao').value;
      const categoria = document.getElementById('categoria').value;
      const periodo = document.getElementById('periodo').value;
      const valor = parseFloat(document.getElementById('valor').value);

      if (!periodo || !descricao || isNaN(valor) || valor <= 0) return;

    // Envia para o backend
    fetch('/pages/api/salvar_gasto', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ descricao, valor })
    });

      const li = document.createElement('li');
      li.className = "flex justify-between items-center border-b py-2";
      li.innerHTML = `
        <span>${periodo}</span>
        <span>${descricao}</span>
        <span>${categoria}</span>
        <span>R$ ${valor.toFixed(2)}</span>
      `;
      lista.appendChild(li);

      total += valor;
      totalSpan.textContent = total.toFixed(2);

      form.reset();
    });

