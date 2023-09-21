export function IconButtonWithBgGold({ icon, onClick, props, text, textClassName, className }) {
  return (
    <div
      className={`goldGradient group relative flex aspect-square w-12  justify-end rounded-full p-7 transition hover:cursor-pointer hover:opacity-50 lg:p-5 ${className}`}
      onClick={onClick}
      {...props}
    >
      <i
        className={`${icon} absolute inset-0 flex items-center justify-center ${
          text && "px-5 xl:justify-start"
        } !text-2xl text-white transition group-hover:text-base lg:!text-xl`}
      />
      {text && <h1 className={`!text-xs transition group-hover:text-base ${textClassName}`}>{text}</h1>}
    </div>
  );
}
