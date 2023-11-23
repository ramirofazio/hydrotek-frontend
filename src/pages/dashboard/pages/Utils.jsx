export function TableRow({ content, style = "text-center", ...props }) {
  return <td {...props} className={`border border-gold px-4 py-2 text-xs xl:text-sm ${style}`}>{content}</td>;
}

export function dateTransform(fechaString) {
  const fecha = new Date(fechaString);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();

  const fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}`;

  return fechaFormateada;
}
