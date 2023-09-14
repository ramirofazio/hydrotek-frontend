export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|gob|com\.ar|gob\.ar)$/;
  return emailRegex.test(email);
}


export function isValidPassword(password) {
  if (password.length < 8) {
    return "Debe tener al menos 8 caracteres";
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
    return "Debe tener caracteres en minuscula y mayuscula";
  }
  if (!/\d/.test(password)) {
    return "Debe tener al menos un numero";
  }
  return false;
}
