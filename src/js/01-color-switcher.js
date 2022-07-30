function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body')
let timerId = null;

buttonStart.addEventListener('click', buttonStartClick);
buttonStop.addEventListener('click', buttonStopClick);

function buttonStartClick() {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, 1000);

    disableButtonClick(this)
};

function disableButtonClick(button) {
    button.disabled = true;
}

function buttonStopClick() {
    clearInterval(timerId);
    enableButtonClick(buttonStart)
};

function enableButtonClick(button) {
    button.disabled = false;
}