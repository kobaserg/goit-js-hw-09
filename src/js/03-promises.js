import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const inputForm = document.querySelector('form.form');
inputForm.addEventListener('input', onInputForm);
inputForm.addEventListener('submit', onSubmitForm);

let delay = 0;
let step = 0;
let amount = 0;

function onInputForm() {
  delay = Number(inputForm.elements.delay.value);
  step = Number(inputForm.elements.step.value);
  amount = Number(inputForm.elements.amount.value);
}

function onSubmitForm(event) {
  event.preventDefault();
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(value => {
        Notiflix.Notify.success(value);
      })
      .catch(error => {
        Notiflix.Notify.failure(error);
      });
    delay += step;
  }
  inputForm.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
