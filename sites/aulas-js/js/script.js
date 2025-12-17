//Saídas
// document.getElementById("texto").innerHTML="Meu Primeito texto <b>JS</b>!";

// document.write("Oi escrito com document.write!");

// alert(10+5);

// console.log('Isso é console.log');
/*
let = a,b,c;
a = 5;
b = 6;
c = 7;
*/
/*
const a = "Fábio";
console.log(a);
*/

//Funçõa

function soma(valor1, valor2) {
    return (
        valor1 + valor2
    )
}

document.getElementById("texto").innerHTML = soma(10, 10);


function realParaDolar (real, cotacaoDolar) {
    return (
        real * cotacaoDolar
    )
}

const total = realParaDolar(10, 5.08);

alert(total);