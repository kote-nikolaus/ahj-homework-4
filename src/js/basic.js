/* eslint-disable radix */
/* eslint-disable  no-restricted-globals */

const mir = document.getElementById('payment-system-mir');
const visa = document.getElementById('payment-system-visa');
const mastercard = document.getElementById('payment-system-mastercard');
const maestro = document.getElementById('payment-system-maestro');
const amexp = document.getElementById('payment-system-amexp');
const undef = document.getElementById('payment-system-undef');
const paymentSystems = Array.from(document.getElementsByClassName('payment-system'));

const field = document.getElementById('field');
const button = document.getElementById('validate-button');
const notValid = document.getElementById('not-valid');
const valid = document.getElementById('valid');

export function luhnAlgorithm(number) {
  const strNumber = String(number);
  let sum = parseInt(strNumber.charAt(strNumber.length - 1));
  for (let i = 0; i < strNumber.length - 1; i += 1) {
    let value = parseInt(strNumber.charAt(i));
    if (i % 2 === 0) {
      value *= 2;
    }
    if (value > 9) {
      value -= 9;
    }
    sum += value;
  }
  return sum % 10 === 0;
}

export function validateNumber(number) {
  if ((!isNaN(number)) && (number.length === 16) && (luhnAlgorithm(number))) {
    return true;
  }
  return false;
}

export function definePaymentSystem(number) {
  if (number.charAt(0) === '2') {
    return 'mir';
  }
  if (number.charAt(0) === '3') {
    if (number.charAt(1) === '4' || number.charAt(1) === '7') {
      return 'amexp';
    }
  }
  if (number.charAt(0) === '4') {
    return 'visa';
  }
  if (number.charAt(0) === '5') {
    if (number.charAt(1) === '1' || number.charAt(1) === '2' || number.charAt(1) === '3'
    || number.charAt(1) === '4' || number.charAt(1) === '5') {
      return 'mastercard';
    }
    if (number.charAt(1) === '0' || number.charAt(1) === '6'
    || number.charAt(1) === '7' || number.charAt(1) === '8') {
      return 'maestro';
    }
  }
  if (number.charAt(0) === '6') {
    if (number.charAt(1) === '3' || number.charAt(1) === '7') {
      return 'maestro';
    }
  }
  return 'not defined';
}

export function selectPaymentSystem(number) {
  switch (definePaymentSystem(number)) {
    case 'mir':
      mir.style.filter = 'grayscale(0)';
      break;
    case 'amexp':
      amexp.style.filter = 'grayscale(0)';
      break;
    case 'visa':
      visa.style.filter = 'grayscale(0)';
      break;
    case 'mastercard':
      mastercard.style.filter = 'grayscale(0)';
      break;
    case 'maestro':
      maestro.style.filter = 'grayscale(0)';
      break;
    default: undef.style.filter = 'grayscale(0)';
  }
}

function showResult(e) {
  valid.style.display = 'none';
  notValid.style.display = 'none';
  for (let i = 0; i < paymentSystems.length; i += 1) {
    paymentSystems[i].style.filter = 'grayscale(100%)';
  }
  e.preventDefault();
  const number = field.value.replace(/\s/g, '');
  if (validateNumber(number)) {
    valid.style.display = 'block';
    selectPaymentSystem(number);
  } else {
    notValid.style.display = 'block';
  }
}

if (button) {
  button.addEventListener('click', showResult);
}
