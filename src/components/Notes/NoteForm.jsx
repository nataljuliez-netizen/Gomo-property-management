// src/components/Notes/NoteForm.jsx

import { useEffect, useState } from "react";
import { Input, TextArea } from "../common";

export default function NoteForm({
  note,
  properties,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Tenant Payment",
    propertyId: "",
    propertyName: "",
    dueDate: "",
    priority: "Medium",
    description: "",
  });

  useEffect(() => {
    if (note) {
      setFormData({
        ...note,
      });
    }
  }, [note]);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "propertyId") {
      const property =
        properties.find(
          (p) => p.id === value
        ) || {};

      setFormData((prev) => ({
        ...prev,
        propertyId: value,
        propertyName: property.name || "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        label="Reminder Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g. Collect July Rent"
        required
      />

      <div>
        <label className="mb-1 block font-medium">
          Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
        >
          <option>Tenant Payment</option>
          <option>Vacant Unit</option>
          <option>Mortgage</option>
          <option>Maintenance</option>
          <option>Deposit Banking</option>
          <option>Lease Renewal</option>
          <option>Follow-up</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">
          Related Property (Optional)
        </label>

        <select
          name="propertyId"
          value={formData.propertyId}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
        >
          <option value="">
            None
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
        label="Due Date"
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        required
      />

      <div>
        <label className="mb-1 block font-medium">
          Priority
        </label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <TextArea
        label="Description (Optional)"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Add any extra information..."
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
          {note
            ? "Update Reminder"
            : "Save Reminder"}
        </button>
      </div>
    </form>
  );
}