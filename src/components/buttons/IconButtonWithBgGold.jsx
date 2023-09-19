export function IconButtonWithBgGold({ icon, onClick, props, className }) {
  return (
    <div
      className={`goldGradient group relative rounded-full p-7 transition hover:cursor-pointer hover:opacity-50 lg:p-5 ${className}`}
      onClick={onClick}
      {...props}
    >
      <i
        className={`${icon} absolute inset-0 flex items-center justify-center !text-2xl text-white transition group-hover:text-base lg:!text-xl`}
      />
    </div>
  );
}
