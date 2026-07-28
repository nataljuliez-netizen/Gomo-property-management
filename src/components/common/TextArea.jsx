export default function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  required = false,
  error = "",
}) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
          {required && (
            <span className="text-red-600"> *</span>
          )}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-lg border px-4 py-2 outline-none transition resize-none ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-300"
            : "border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
        }`}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}