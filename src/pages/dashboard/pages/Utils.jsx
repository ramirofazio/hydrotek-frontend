export function TableRow({ content, style = "text-center" }) {
  return <td className={`border border-gold px-4 py-2 text-xs xl:text-sm ${style}`}>{content}</td>;
}
