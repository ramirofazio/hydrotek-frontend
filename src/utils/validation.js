export const regex = {
  isValidEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|gob|com\.ar|gob\.ar)$/,
  containNumber: /\d/,
  containSpace: /\s/,
  containUppercase: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
  containLetter: /[a-zA-Z]/,
};

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
    if (password.length < 8) errs.password = "debe tener al menos 8 caracteres";
    if (!regex.containUppercase.test(password)) errs.password = "debe tener al menos una letra en mayuscula";
    if (!regex.containNumber.test(password)) errs.password = "debe tener al menos un numero";
    if (regex.containSpace.test(password)) errs.password = "no puede tener espacios";
  }
  if (password && confirmPassword) {
    if (password !== confirmPassword) errs.confirmPassword = "las contraseñas no coinciden";
  }
  return errs;
}

export function isValidChangePassword(newPassword, newConfirmPassword) {
  const errs = {};
  if (newPassword.length < 8) errs.newPassword = "debe tener al menos 8 caracteres";
  if (!regex.containUppercase.test(newPassword)) errs.newPassword = "debe tener al menos una letra en mayuscula";
  if (!regex.containNumber.test(newPassword)) errs.newPassword = "debe tener al menos un numero";
  if (regex.containSpace.test(newPassword)) errs.newPassword = "no puede tener espacios";

  if (newPassword && newConfirmPassword) {
    if (newPassword !== newConfirmPassword) errs.newConfirmPassword = "las contraseñas no coinciden";
  }
  return errs;
}
