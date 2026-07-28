// src/components/Transactions/DeleteTransactionModal.jsx

import Modal from "../common/Modal";
import Button from "../common/Button";

export default function DeleteTransactionModal({
  open,
  onClose,
  onConfirm,
  transaction,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Transaction"
    >
      <div className="space-y-6">
        <p className="text-gray-600">
          Are you sure you want to delete this rental transaction?
        </p>

        {transaction && (
          <div className="rounded-lg border bg-gray-50 p-4 space-y-2">
            <p>
              <strong>Tenant:</strong>{" "}
              {transaction.tenantName}
            </p>

            <p>
              <strong>Property:</strong>{" "}
              {transaction.propertyName}
            </p>

            <p>
              <strong>Unit:</strong>{" "}
              {transaction.unitNumber}
            </p>

            <p>
              <strong>Billing Period:</strong>{" "}
              {transaction.billingPeriod}
            </p>

            <p>
              <strong>Rent Paid:</strong> R{" "}
              {Number(
                transaction.rentPaid
              ).toLocaleString()}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}