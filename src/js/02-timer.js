import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const flatpickrBox = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

btnStart.setAttribute('disabled', true);
let finishDate = new Date();
let startDate = new Date();

flatpickr(flatpickrBox, {
  dateFormat: 'd-m-Y H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    btnStart.removeAttribute('disabled');
    //   Проверка даты !!!!
    if (startDate < selectedDates[0]) {
      finishDate = selectedDates[0];
    } else {
      window.alert('Please choose a date in the future');
    }
  },
});

btnStart.addEventListener(
  'click',
  () => (timerId = setInterval(startCountTime, 1000))
);

function startCountTime() {
  btnStart.setAttribute('disabled', true);
  startDate = new Date();

  const diffInMs = Math.abs(finishDate - startDate);
  const oneDay = 1000 * 60 * 60 * 24;
  const oneHour = oneDay / 24;
  const oneMinute = oneHour / 60;
  const oneSecond = oneMinute / 60;

  const diffDays = Math.trunc(diffInMs / oneDay);

  const diffHours = Math.trunc((diffInMs - diffDays * oneDay) / oneHour);

  const diffMinuts = Math.trunc(
    (diffInMs - (diffDays * oneDay + diffHours * oneHour)) / oneMinute
  );

  const diffSeconds = Math.trunc(
    (diffInMs -
      (diffDays * oneDay + diffHours * oneHour + diffMinuts * oneMinute)) /
      oneSecond
  );

  days.textContent = diffDays;
  hours.textContent = diffHours;
  minutes.textContent = diffMinuts;
  seconds.textContent = diffSeconds;
}
