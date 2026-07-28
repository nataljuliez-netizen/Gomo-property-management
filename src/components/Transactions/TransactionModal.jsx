// src/components/Transactions/TransactionModal.jsx

import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import TransactionForm from "./TransactionForm";

const emptyTransaction = {
  tenantId: "",
  propertyId: "",
  unitId: "",
  billingPeriod: "",
  rentPayable: "",
  rentPaid: "",
  rentDue: 0,
  dueDate: "",
  paymentDate: "",
  status: "Due",
  notes: "",
};

export default function TransactionModal({
  open,
  onClose,
  onSave,
  transaction,
  tenants,
  properties,
  units,
}) {
  const [currentTransaction, setCurrentTransaction] =
    useState(emptyTransaction);

  useEffect(() => {
    if (transaction) {
      setCurrentTransaction(transaction);
    } else {
      setCurrentTransaction(emptyTransaction);
    }
  }, [transaction, open]);

  function handleSubmit(data) {
    if (transaction) {
      onSave({
        ...transaction,
        ...data,
      });
    } else {
      onSave(data);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        transaction
          ? "Edit Rental Transaction"
          : "Record Rental Income"
      }
    >
      <TransactionForm
        transaction={currentTransaction}
        tenants={tenants}
        properties={properties}
        units={units}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}