import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
formEl.addEventListener('input', throttle(onInput, 500));
formEl.addEventListener('submit', onSubmit);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
const inputForm = {};

function onInput(evt) {
  inputForm[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(inputForm));
}

function fillForm() {
  const parseData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (parseData) {
    email.value = parseData.email;
    message.value = parseData.message;
  }
}
fillForm();

function onSubmit(evt) {
  evt.preventDefault();
  console.log(inputForm);
  localStorage.removeItem(LOCALSTORAGE_KEY);
  evt.currentTarget.reset();
}
