const API_URL = 'http://localhost:3000/usuarios';

const form = document.getElementById('userForm');
const userList = document.getElementById('userList');
const submitBtn = document.getElementById('submitBtn');
const userIdInput = document.getElementById('userId');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const foneInput = document.getElementById('fone');

// Carregar lista de usuários
async function fetchUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();
  userList.innerHTML = '';

  users.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${user.name} | ${user.email} | ${user.fone}
      <span>
        <button onclick="editUser('${user.id}')">Editar</button>
        <button onclick="deleteUser('${user.id}')">Excluir</button>
      </span>
    `;
    userList.appendChild(li);
  });
}

// Cadastrar ou atualizar usuário
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: nameInput.value,
    email: emailInput.value,
    fone: foneInput.value
  };

  try {
    let res;
    if (userIdInput.value) {
      // Atualizar
      res = await fetch(`${API_URL}/${userIdInput.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } else {
      // Criar
      res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }

    const result = await res.json();
    if (!res.ok) {
      alert('Erro: ' + result.erro);
      return;
    }

    alert(userIdInput.value ? 'Usuário atualizado!' : 'Usuário cadastrado!');
    form.reset();
    userIdInput.value = '';
    submitBtn.textContent = 'Cadastrar';
    fetchUsers();
  } catch (err) {
    console.error(err);
  }
});

// Editar usuário
async function editUser(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const user = await res.json();

  userIdInput.value = user.id;
  nameInput.value = user.name;
  emailInput.value = user.email;
  foneInput.value = user.fone;
  submitBtn.textContent = 'Atualizar';
}

// Excluir usuário
async function deleteUser(id) {
  if (!confirm('Deseja realmente excluir este usuário?')) return;

  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  const result = await res.json();

  if (!res.ok) {
    alert('Erro: ' + result.erro);
    return;
  }

  alert('Usuário removido!');
  fetchUsers();
}

// Inicializa lista
fetchUsers();
