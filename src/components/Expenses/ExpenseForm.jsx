// src/components/Expenses/ExpenseForm.jsx

import { useEffect, useState } from "react";

import {
  Input,
  TextArea,
} from "../common";

export default function ExpenseForm({
  expense,
  properties,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    expenseName: "",
    propertyId: "",
    amount: "",
    expenseDate: "",
    notes: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData(expense);
    }
  }, [expense]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const property =
      properties.find(
        (p) => p.id === formData.propertyId
      ) || {};

    onSubmit({
      ...formData,
      propertyName: property.name || "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        label="Expense Name"
        name="expenseName"
        value={formData.expenseName}
        onChange={handleChange}
        placeholder="e.g. Plumbing Repairs"
        required
      />

      <div>
        <label className="block mb-1 font-medium">
          Property (Optional)
        </label>

        <select
          name="propertyId"
          value={formData.propertyId}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
        >
          <option value="">
            General Expense
          </option>

          {properties.map((property) => (
            <option
              key={property.id}
              value={property.id}
            >
              {property.name}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Amount (R)"
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <Input
        label="Expense Date"
        type="date"
        name="expenseDate"
        value={formData.expenseDate}
        onChange={handleChange}
        required
      />

      <TextArea
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Optional notes..."
      />

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-4 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Save Expense
        </button>
      </div>
    </form>
  );
}