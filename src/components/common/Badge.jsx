export default function Badge({
  children,
  color = "gray",
}) {
  const colors = {
    green:
      "bg-green-100 text-green-800 border border-green-200",

    red:
      "bg-red-100 text-red-800 border border-red-200",

    yellow:
      "bg-yellow-100 text-yellow-800 border border-yellow-200",

    blue:
      "bg-blue-100 text-blue-800 border border-blue-200",

    gray:
      "bg-slate-100 text-slate-700 border border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}