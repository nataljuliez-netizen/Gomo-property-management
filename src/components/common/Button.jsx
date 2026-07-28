export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition duration-200";

  const variants = {
    primary:
      "bg-green-600 hover:bg-green-700 text-white",

    secondary:
      "bg-slate-500 hover:bg-slate-600 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    outline:
      "border border-slate-300 bg-white hover:bg-slate-100 text-slate-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : ""
      }`}
    >
      {children}
    </button>
  );
}