import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onClickButton);

const keyStorage = 'feedback-form-state';
const obj = localStorage.getItem(keyStorage);
const parsedObj = JSON.parse(obj);

saveInput();

function onInput(e) {
  localStorage.setItem(
    keyStorage,
    JSON.stringify({
      email: form.elements.email.value,
      message: form.elements.message.value,
    })
  );

  parsedObj[e.target.name] = e.target.value;
}

function saveInput() {
  if (obj) {
    form.elements.email.value = parsedObj.email || '';
    form.elements.message.value = parsedObj.message || '';
  }
}

function onClickButton(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(keyStorage);
  console.log(parsedObj);
}
