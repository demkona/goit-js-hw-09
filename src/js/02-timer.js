import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataTime = document.querySelector('#datetime-picker');
const dataStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]')
const dataHours = document.querySelector('span[data-hours]')
const dataMinutes = document.querySelector('span[data-minutes]')
const dataSeconds = document.querySelector('span[data-seconds]')

dataStart.addEventListener('click', timerStartClick);

let currentDate = new Date();
let selectedDate = new Date();
let timerId = null;
let startTime = {};
dataStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0]
        if (selectedDate < options.defaultDate) {
            Notify.failure("Please choose a date in the future");
            dataStart.disabled = true;
        } else {
            dataStart.disabled = false;
        }
    }
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function showTime() {

    dataDays.textContent = addLeadingZero(startTime.days);
    dataHours.textContent = addLeadingZero(startTime.hours);
    dataMinutes.textContent = addLeadingZero(startTime.minutes);
    dataSeconds.textContent = addLeadingZero(startTime.seconds);
}
function timerStartClick() {
    timerId = setInterval(() => {
        currentDate = new Date()

        if (currentDate < selectedDate) {
            startTime = convertMs(selectedDate - currentDate);
            showTime(startTime);
        } else {
            dataStart.disabled = false;
            clearInterval(timerId);
        }
    }, options.minuteIncrement);

    disableButtonClick(this)
};

function disableButtonClick(button) {
    button.disabled = true;
    dataTime.disabled = true;
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

flatpickr(dataTime, options);




