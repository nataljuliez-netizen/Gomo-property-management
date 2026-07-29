import Modal from "../common/Modal";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseModal({
  open,
  onClose,
  onSave,
  expense,
  properties,
  units,
}) {
  if (!open) return null;

  function handleSubmit(data) {
    onSave({
      ...expense,
      ...data,
    });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        expense
          ? "Edit Expense"
          : "Record Expense"
      }
    >
      <ExpenseForm
        expense={expense}
        properties={properties}
        units={units}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}