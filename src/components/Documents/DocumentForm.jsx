import { useEffect, useState } from "react";
import { Input, TextArea } from "../common";
import { validateDocumentFile } from "../../services/documentApi";

export default function DocumentForm({
  document,
  transactions,
  expenses,
  tenants,
  properties,
  units,
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
    fileUrl: "",
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
    const file = e.target.files?.[0];

    if (!file) return;

    const validation = validateDocumentFile(file);

    if (!validation.valid) {
      alert(validation.message);
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      file,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    }));
  }

  function getTransactionLabel(transaction) {
    const tenant =
      tenants.find((t) => t.id === transaction.tenantId);

    const property =
      properties.find(
        (p) => p.id === transaction.propertyId
      );

    const unit =
      units.find((u) => u.id === transaction.unitId);

    return [
      tenant?.fullName,
      property?.propertyName,
      unit?.unitNumber,
    ]
      .filter(Boolean)
      .join(" • ");
  }

  const relatedItems =
    formData.relatedType === "Rental Income"
      ? transactions
      : expenses;

  function handleSubmit(e) {
    e.preventDefault();

    if (!document && !formData.file) {
      alert("Please upload a document.");
      return;
    }

    const selected =
      relatedItems.find(
        (item) => item.id === formData.relatedId
      ) || {};

    let relatedName = "";

    if (formData.relatedType === "Rental Income") {
      relatedName = getTransactionLabel(selected);
    } else {
      relatedName =
        selected.expenseName ||
        selected.name ||
        "";
    }

    onSubmit({
      ...formData,
      relatedName,
    });
  }

  return (
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <option key={item.id} value={item.id}>
              {formData.relatedType === "Rental Income"
                ? getTransactionLabel(item)
                : `${item.expenseName || item.name} - R${Number(
                    item.amount || 0
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

        {(formData.fileName || formData.fileUrl) && (
          <div className="mt-2 rounded-lg bg-gray-50 p-3 text-sm">
            <p className="font-medium">
              {formData.fileName}
            </p>

            {formData.fileSize > 0 && (
              <p className="text-gray-500">
                {(formData.fileSize / 1024).toFixed(1)} KB
              </p>
            )}

            {formData.fileUrl && (
              <a
                href={formData.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-600 hover:underline"
              >
                View Current Document
              </a>
            )}
          </div>
        )}

        <p className="mt-2 text-xs text-gray-500">
          Accepted formats: PDF, JPG, PNG, WEBP (Maximum 5 MB)
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