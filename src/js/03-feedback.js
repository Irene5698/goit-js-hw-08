import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onClickButton);

const LOCAL_DATA = 'feedback-form-state';
const obj = localStorage.getItem(LOCAL_DATA);
const parsedObj = JSON.parse(obj);

saveInput();

function onInput(e) {
  localStorage.setItem(
    LOCAL_DATA,
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
  localStorage.removeItem(LOCAL_DATA);
  console.log(parsedObj);
}
