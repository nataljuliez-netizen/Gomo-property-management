import { useEffect, useState } from "react";

import { Modal } from "../common";
import LandlordForm from "./LandlordForm";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  bankName: "",
  accountNumber: "",
  branchCode: "",
  notes: "",
  status: "Active",
};

export default function LandlordModal({
  open,
  landlord,
  onSave,
  onClose,
}) {
  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (landlord) {
      setFormData(landlord);
    } else {
      setFormData(emptyForm);
    }
  }, [landlord]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required.");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Phone number is required.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Email is required.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Invalid email address.");
      return;
    }

    const saPhoneRegex =
      /^(?:\+27|0)[6-8][0-9]{8}$/;

    if (!saPhoneRegex.test(formData.phone)) {
      alert(
        "Please enter a valid South African phone number."
      );
      return;
    }

    onSave(formData);
  }

  return (
    <Modal
      open={open}
      title={
        landlord
          ? "Edit Landlord"
          : "Add Landlord"
      }
      onClose={onClose}
      onConfirm={() =>
        handleSubmit({
          preventDefault: () => {},
        })
      }
      confirmText={
        landlord
          ? "Update"
          : "Save"
      }
    >
      <LandlordForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Modal>
  );
}