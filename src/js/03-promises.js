import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormClick);

function onFormClick(event) {
  event.preventDefault()

  const { delay, step, amount } = event.target
  const numberAmount = Number(amount.value)
  const numberStep = Number(step.value)
  let numberDelay = Number(delay.value)

  for (let position = 1; position <= numberAmount; position += 1) {
    createPromise(position, numberDelay + (numberStep * position))
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })
};


