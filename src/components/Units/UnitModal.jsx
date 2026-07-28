import { useEffect, useState } from "react";

import { Button, Modal } from "../common";
import UnitForm from "./UnitForm";

const emptyForm = {
  unitNumber: "",
  propertyId: "",
  bedrooms: "",
  bathrooms: "",
  rent: "",
  deposit: "",
  status: "Vacant",
  notes: "",
};

export default function UnitModal({
  open,
  onClose,
  onSave,
  unit,
  properties,
}) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (unit) {
      setFormData(unit);
    } else {
      setFormData(emptyForm);
    }
  }, [unit, open]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      ...unit,
      ...formData,
    });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        unit
          ? "Edit Unit"
          : "Add Unit"
      }
    >
      <UnitForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        properties={properties}
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
          Save Unit
        </Button>
      </div>
    </Modal>
  );
}