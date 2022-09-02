const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyBlock = document.querySelector('body');

let timerId = null;
btnStop.setAttribute('disabled', true);
btnStart.style.cursor = 'pointer';
btnStop.style.cursor = 'default';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeBodyColor() {
  bodyBlock.style.backgroundColor = getRandomHexColor();
}

function onStatusButton(activButton, inActiveButton) {
  inActiveButton.setAttribute('disabled', true);
  activButton.removeAttribute('disabled');
  activButton.style.cursor = 'pointer';
  inActiveButton.style.cursor = 'default';
}

btnStart.addEventListener('click', () => {
  onStatusButton(btnStop, btnStart);
  timerId = setInterval(onChangeBodyColor, 1000);
});

btnStop.addEventListener('click', () => {
  onStatusButton(btnStart, btnStop);
  clearInterval(timerId);
});
