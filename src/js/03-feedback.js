import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
formEl.addEventListener('input', throttle(onInput, 500));
formEl.addEventListener('submit', onSubmit);

const LOCALSTORAGE_KEY = 'feedback-form-state';
let inputForm = {};

function onInput(evt) {
  inputForm[email.name] = email.value;
  inputForm[message.name] = message.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(inputForm));
}

function fillForm() {
  const parseData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (parseData) {
    email.value = parseData.email;
    message.value = parseData.message;
    // inputForm = parseData;
  }
}
fillForm();

function onSubmit(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  localStorage.removeItem(LOCALSTORAGE_KEY);
  evt.currentTarget.reset();
  inputForm = {};
}
