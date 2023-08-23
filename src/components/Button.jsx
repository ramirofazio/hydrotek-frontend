export const Button = ({ text, classname, ...props }) => {
  return (
    <button className={`border-2 border-gold rounded-[4.325rem] bg-transparent text-white py-2 px-6 hover:bg-black/30 hover:text-white/70 ${classname}`} {...props}>
      {text}
    </button>
  );
};
