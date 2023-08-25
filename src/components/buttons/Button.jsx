export const Button = ({ text, classname, ...props }) => {
  return (
    <button
      className={`rounded-[4.325rem] border-2 border-gold bg-transparent px-6 py-2 text-white hover:bg-black/30 hover:text-white/70 ${classname}`}
      {...props}
    >
      {text}
    </button>
  );
};
