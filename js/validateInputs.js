import comparePassword from './comparePassword.js';

function validateInputs() {
  const inputs = querySelectorAll('[required]');
  const spans = querySelectorAll('[required] ~ span');
  console.log(inputs);

  for (let input of inputs) {
    input.addEventListener('onkeyup', () => {
      if (input.value === '') {
        for (let span of spans) {
          span.classList.add('span-error');
        }
        input.style.border = '1px solid red';
      } else {
        for (let span of spans) {
          span.classList.remove('span-error');
        }
        input.style.border = '1px solid #ccc';
        comparePassword();
      }
    });
  }
}

export default validateInputs;
