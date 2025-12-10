//Pegar o elemento
const doutora = document.getElementById('doutora');
//Evento mouse estiver por cima da imagem
doutora.addEventListener('mouseover', function () {
    doutora.src = "./img/doutora.webp";
});
//Evento mouse sair de cima da imagem
doutora.addEventListener('mouseout', function () {
    doutora.src = "./img/doutora2.webp";
});