import { useEffect, useState } from "react";

import { Button, Modal } from "../common";
import TenantForm from "./TenantForm";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  idNumber: "",
  unitId: "",
  moveInDate: "",
  notes: "",
};

export default function TenantModal({
  open,
  onClose,
  onSave,
  tenant,
  units,
}) {
  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (tenant) {
      setFormData(tenant);
    } else {
      setFormData(emptyForm);
    }
  }, [tenant, open]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();

    onSave({
      ...tenant,
      ...formData,
    });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        tenant
          ? "Edit Tenant"
          : "Add Tenant"
      }
    >
      <TenantForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        units={units}
      />

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
        >
          Save Tenant
        </Button>
      </div>
    </Modal>
  );
}