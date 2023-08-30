export const Button = ({ text, img, classname, ...props }) => {
  return (
    <button
      className={`rounded-[4.325rem] border-2 border-gold bg-transparent px-6 py-2 uppercase tracking-widest text-white transition hover:bg-gold hover:text-[#1B142C] ${classname}`}
      {...props}
    >
      {img && <img src={img[0]} className={img[1]} />}
      {text}
    </button>
  );
};
