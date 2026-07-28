// src/components/Documents/DocumentForm.jsx

import { useEffect, useState } from "react";
import { Input, TextArea } from "../common";
import { validateDocumentFile } from "../../services/documentService";

export default function DocumentForm({
  document,
  transactions,
  expenses,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    documentName: "",
    documentType: "Receipt",
    relatedType: "Rental Income",
    relatedId: "",
    relatedName: "",
    notes: "",
    file: null,
    fileName: "",
    fileType: "",
    fileSize: 0,
    fileData: "",
  });

  useEffect(() => {
    if (document) {
      setFormData({
        ...document,
        file: null,
      });
    }
  }, [document]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const validation = validateDocumentFile(file);

    if (!validation.valid) {
      alert(validation.message);
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        file,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileData: reader.result,
      }));
    };

    reader.onerror = () => {
      alert("Unable to read the selected file.");
      e.target.value = "";
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !document &&
      (!formData.fileData || !formData.fileName)
    ) {
      alert("Please upload a document.");
      return;
    }

    const relatedList =
      formData.relatedType === "Rental Income"
        ? transactions
        : expenses;

    const selected =
      relatedList.find(
        (item) => item.id === formData.relatedId
      ) || {};

    const relatedName =
      formData.relatedType === "Rental Income"
        ? `${selected.tenantName || ""}${
            selected.billingPeriod
              ? ` - ${selected.billingPeriod}`
              : ""
          }`
        : selected.expenseName || "";

    onSubmit({
      ...formData,
      relatedName,
    });
  }

  const relatedItems =
    formData.relatedType === "Rental Income"
      ? transactions
      : expenses;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        label="Receipt Name"
        name="documentName"
        value={formData.documentName}
        onChange={handleChange}
        required
      />

      <div>
        <label className="block mb-1 font-medium">
          Document Type
        </label>

        <select
          name="documentType"
          value={formData.documentType}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
        >
          <option>Receipt</option>
          <option>Proof of Payment</option>
          <option>Invoice</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Related To
        </label>

        <select
          name="relatedType"
          value={formData.relatedType}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
        >
          <option>Rental Income</option>
          <option>Expense</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Select Record
        </label>

        <select
          name="relatedId"
          value={formData.relatedId}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
          required
        >
          <option value="">Select...</option>

          {relatedItems.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {formData.relatedType === "Rental Income"
                ? `${item.tenantName} - ${item.billingPeriod}`
                : `${item.expenseName} - R${Number(
                    item.amount
                  ).toLocaleString()}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Upload Document
        </label>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          onChange={handleFileChange}
          className="w-full rounded-lg border p-2"
          required={!document}
        />

        {formData.fileName && (
          <div className="mt-2 rounded-lg bg-gray-50 p-3 text-sm">
            <p className="font-medium">
              {formData.fileName}
            </p>

            {formData.fileSize > 0 && (
              <p className="text-gray-500">
                {(formData.fileSize / 1024).toFixed(1)} KB
              </p>
            )}
          </div>
        )}

        <p className="mt-2 text-xs text-gray-500">
          Accepted formats: PDF, JPG, PNG, WEBP (Maximum
          5 MB)
        </p>
      </div>

      <TextArea
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
      />

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Save Document
        </button>
      </div>
    </form>
  );
}