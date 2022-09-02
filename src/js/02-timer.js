import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const flatpickrBox = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
console.log(btnStart);

flatpickr(flatpickrBox, {
  minDate: 'today',
  dateFormat: 'd-m-Y H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});
