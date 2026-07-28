import { useEffect, useState } from "react";

import { Modal } from "../common";
import PropertyForm from "./PropertyForm";

const emptyForm = {
  name: "",
  type: "House",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  landlordId: "",
  notes: "",
  status: "Active",
};

export default function PropertyModal({
  open,
  property,
  landlords,
  onSave,
  onClose,
}) {
  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (property) {
      setFormData(property);
    } else {
      setFormData(emptyForm);
    }
  }, [property]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Property name is required.");
      return;
    }

    if (!formData.address.trim()) {
      alert("Address is required.");
      return;
    }

    if (!formData.landlordId) {
      alert("Please select a landlord.");
      return;
    }

    onSave(formData);
  }

  return (
    <Modal
      open={open}
      title={
        property
          ? "Edit Property"
          : "Add Property"
      }
      onClose={onClose}
      onConfirm={() =>
        handleSubmit({
          preventDefault: () => {},
        })
      }
      confirmText={
        property
          ? "Update"
          : "Save"
      }
    >
      <PropertyForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        landlords={landlords}
      />
    </Modal>
  );
}