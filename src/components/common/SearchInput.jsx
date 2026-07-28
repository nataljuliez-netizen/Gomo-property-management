export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mb-6 w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
    />
  );
}