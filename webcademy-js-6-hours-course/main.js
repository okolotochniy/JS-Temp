const valueDollar = document.querySelector('#usd');
const valueEuro = document.querySelector('#eur');
const url = 'https://www.cbr-xml-daily.ru/daily_json.js';

console.log(valueDollar);
console.log(valueEuro);

getValueMoney();

async function getValueMoney() {
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        renderValueMoney(responseData);
    } catch (err){
        alert("Ошибка HTTP: " + err);
    }

} 

function renderValueMoney(responseData) {
    valueDollar.innerText = responseData.Valute.USD.Value.toFixed(2);
    valueEuro.innerText = responseData.Valute.EUR.Value.toFixed(2);
}

