export function Error({ text, className }) {
  return <p className={`mx-auto w-fit p-1 text-center text-xs text-red-500  md:text-sm ${className}`}>{text}</p>;
}
