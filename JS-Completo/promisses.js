//trás todos usuários
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))

//trás usuário id:1
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => console.log(data[0]))
  .catch(err => console.error(err))