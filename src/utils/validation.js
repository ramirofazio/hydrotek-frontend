export const regex = {
  isValidEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|gob|com\.ar|gob\.ar)$/,
  containNumber: /\d/,
  containSpace: /\s/,
  containUppercase: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
  containLetter: /[a-zA-Z]/,
};

function validatePassword(password) {
  if (password.length < 8) return "debe tener al menos 8 caracteres";
  if (!regex.containUppercase.test(password)) return "debe tener al menos una letra en mayuscula";
  if (!regex.containNumber.test(password)) return "debe tener al menos un numero";
  if (regex.containSpace.test(password)) return "no puede tener espacios";
}

export function isValidSignUp({ email, dni, name, password, confirmPassword }) {
  const errs = {};
  if (email) {
    if (!regex.isValidEmail.test(email)) errs.email = "ingrese un email valido";
  }
  if (dni) {
    if (dni.length < 8 || dni.length > 10) errs.dni = "no es un dni valido";
  }
  if (name) {
    if (name.length < 5) errs.name = "ingrese nombre completo";
    if (name.length >= 100) errs.name = "demasiado largo";
    if (regex.containNumber.test(name)) errs.name = "no puede tener numeros";
  }
  if (password) {
    const getErr = validatePassword(password);
    getErr ? (errs.password = getErr) : null;
  }
  if (password && confirmPassword) {
    if (password !== confirmPassword) errs.confirmPassword = "las contraseñas no coinciden";
  }
  return errs;
}

export function isValidChangePassword({ actualPassword, newPassword, newConfirmPassword }) {
  const errs = {};
  if (actualPassword) {
    errs.actualPassword = validatePassword(actualPassword);
  }
  if (newPassword) {
    errs.newPassword = validatePassword(newPassword);
  }
  if (newConfirmPassword) {
    errs.newConfirmPassword = validatePassword(newConfirmPassword);
  }

  if (newPassword && newConfirmPassword) {
    if (newPassword !== newConfirmPassword) errs.newConfirmPassword = "las contraseñas no coinciden";
  }

  return errs;
}

export function isValidGuestCheckout({ firstName, lastName, email, dni, phone }) {
  const errs = {};
  if (email) {
    if (!regex.isValidEmail.test(email)) errs.email = "ingrese un email valido";
  }
  if (dni) {
    if (dni.length < 8 || dni.length > 10) errs.dni = "no es un dni valido";
  }
  if (firstName) {
    if (firstName.length < 5) errs.firstName = "ingrese nombre completo";
    if (firstName.length >= 10) errs.firstName = "demasiado largo";
    if (regex.containNumber.test(firstName)) errs.firstName = "no puede tener numeros";
  }

  if (lastName) {
    if (lastName.length < 5) errs.lastName = "ingrese nombre completo";
    if (lastName.length >= 20) errs.lastName = "demasiado largo";
    if (regex.containNumber.test(lastName)) errs.lastName = "no puede tener numeros";
  }

  if (phone) {
    if (phone.length < 10) errs.phone = "demasiado corto";
    if (phone.length > 20) errs.phone = "demasiado largo";
    if (regex.containLetter.test(phone)) errs.phone = "no puede tener letras";
    if (regex.containSpace.test(phone)) errs.phone = "no puede tener espacios";
  }

  return errs;
}

export function isValidSendInfo({ address, city, province, postalCode }) {
  const errs = {};

  if (address) {
    if (address.length < 5) errs.address = "demasiado corto";
    if (address.length >= 20) errs.address = "demasiado largo";
  }
  if (city) {
    if (city.length < 3) errs.city = "demasiado corto";
    if (city.length >= 20) errs.city = "demasiado largo";
  }
  if (province) {
    if (province.length < 3) errs.province = "demasiado corto";
    if (province.length >= 20) errs.province = "demasiado largo";
  }
  if (postalCode) {
    if (postalCode.length < 2) errs.postalCode = "demasiado corto";
    if (postalCode.length >= 10) errs.postalCode = "demasiado largo";
    if (regex.containLetter.test(postalCode)) errs.postalCode = "no puede tener letras";
  }

  return errs;
}
