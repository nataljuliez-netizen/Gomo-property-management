import Button from "./Button";

export default function Modal({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Save",
  cancelText = "Cancel",
  confirmVariant = "primary",
  showFooter = true,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-900">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 transition hover:text-slate-700"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              {cancelText}
            </Button>

            <Button
              variant={confirmVariant}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}