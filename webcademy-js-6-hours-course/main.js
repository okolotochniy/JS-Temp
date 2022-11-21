const counterElement = document.querySelector('#counter');
const buttonStart = document.querySelector('#start');
const buttonPause = document.querySelector('#pause');
const buttonReset = document.querySelector('#reset');

let counter = 0;
let timerId;

buttonStart.onclick = function () {
   timerId = setInterval(function () {
        counter++;
        counterElement.innerText = counter;
    }, 1000)
}
buttonPause.onclick = function () {
    clearInterval(timerId)
}

buttonReset.onclick = function () {
    counter = 0;
    counterElement.innerText = counter;
}