import Button from "./Button";

export default function PageHeader({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  children,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {children}

        {buttonText && (
          <Button onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}