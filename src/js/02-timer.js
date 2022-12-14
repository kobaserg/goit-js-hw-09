import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const flatpickrBox = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

btnStart.setAttribute('disabled', true);
let finishDate = new Date();
let startDate = new Date();
let timerId = null;

let calendar = flatpickr(flatpickrBox, {
  dateFormat: 'd-m-Y H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let startDate = new Date();
    if (startDate < selectedDates[0]) {
      btnStart.removeAttribute('disabled');
      finishDate = selectedDates[0];
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
});

btnStart.addEventListener('click', () => {
  flatpickrBox.setAttribute('disabled', true);
  btnStart.setAttribute('disabled', true);
  timerId = setInterval(startCountTime, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startCountTime() {
  startDate = new Date();
  let timeOfEnd = finishDate - startDate;
  if (timeOfEnd < 1000) {
    Notiflix.Notify.success('Your time is OVER !!!!');
    clearInterval(timerId);
  }

  let setTimeOfEnd = convertMs(timeOfEnd);

  days.textContent = addLeadingZero(setTimeOfEnd.days);
  hours.textContent = addLeadingZero(setTimeOfEnd.hours);
  minutes.textContent = addLeadingZero(setTimeOfEnd.minutes);
  seconds.textContent = addLeadingZero(setTimeOfEnd.seconds);
}

function addLeadingZero(val) {
  return String(val).padStart(2, '0');
}
