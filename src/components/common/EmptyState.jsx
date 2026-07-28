import Button from "./Button";

export default function EmptyState({
  title = "No data found",
  description = "There is nothing to display yet.",
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
      <h3 className="text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

      {buttonText && (
        <div className="mt-6">
          <Button onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
}