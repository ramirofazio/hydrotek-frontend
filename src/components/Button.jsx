export default function Button({ text, classname, ...props }) {
  return (
    <button className={`border-2 border-gold rounded-[4.325rem] bg-black text-white py-2 px-6 ${classname}`} {...props}>
      {text}
    </button>
  );
}
