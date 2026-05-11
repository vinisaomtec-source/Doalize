// VALIDAR EMAIL
export function validateEmail(email) {

  if (!email) return false;

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}


// VALIDAR SENHA
export function validatePassword(password) {

  if (!password) return false;

  // MÍNIMO 6 CARACTERES
  return password.length >= 6;
}


// VALIDAR NOME
export function validateName(name) {

  if (!name) return false;

  return name.trim().length >= 3;
}


// VALIDAR TEXTO
export function validateText(text) {

  if (!text) return false;

  return text.trim().length > 0;
}


// VALIDAR URL
export function validateUrl(url) {

  if (!url) return false;

  const regex =
    /^(https?:\/\/)[^\s$.?#].[^\s]*$/;

  return regex.test(url);
}


// VALIDAR TELEFONE BR
export function validatePhone(phone) {

  if (!phone) return false;

  const regex =
    /^(\+55\s?)?(\(?\d{2}\)?\s?)?9?\d{4}-?\d{4}$/;

  return regex.test(phone);
}


// VALIDAR CPF
export function validateCPF(cpf) {

  if (!cpf) return false;

  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  // ELIMINA CPF INVÁLIDO
  if (
    /^(\d)\1+$/.test(cpf)
  ) {
    return false;
  }

  let sum = 0;

  let remainder;


  for (let i = 1; i <= 9; i++) {

    sum =
      sum +
      parseInt(cpf.substring(i - 1, i)) *
        (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (
    remainder === 10 ||
    remainder === 11
  ) {
    remainder = 0;
  }

  if (
    remainder !==
    parseInt(cpf.substring(9, 10))
  ) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {

    sum =
      sum +
      parseInt(cpf.substring(i - 1, i)) *
        (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (
    remainder === 10 ||
    remainder === 11
  ) {
    remainder = 0;
  }

  if (
    remainder !==
    parseInt(cpf.substring(10, 11))
  ) {
    return false;
  }

  return true;
}