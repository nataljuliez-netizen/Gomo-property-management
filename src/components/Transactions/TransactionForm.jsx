import { useEffect, useState } from "react";
import {
  Input,
  TextArea,
} from "../common";

export default function TransactionForm({
  transaction,
  tenants,
  properties,
  units,
  onSubmit,
  onCancel,
}) {
  const emptyForm = {
    tenantId: "",
    propertyId: "",
    unitId: "",
    type: "Income",
    category: "Rent",
    amount: "",
    transactionDate: "",
    description: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (transaction) {
      setFormData({
        ...emptyForm,
        ...transaction,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [transaction]);

  useEffect(() => {
    if (!formData.unitId) return;

    const unit = units.find(
      (u) => u.id === formData.unitId
    );

    if (unit) {
      setFormData((prev) => ({
        ...prev,
        propertyId: unit.propertyId,
      }));
    }
  }, [formData.unitId, units]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    });
  }

  const filteredUnits = units.filter(
    (u) =>
      !formData.propertyId ||
      u.propertyId === formData.propertyId
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">
          Tenant
        </label>

        <select
          name="tenantId"
          value={formData.tenantId}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        >
          <option value="">
            Select Tenant
          </option>

          {tenants.map((tenant) => (
            <option
              key={tenant.id}
              value={tenant.id}
            >
              {tenant.firstName} {tenant.lastName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Property
        </label>

        <select
          name="propertyId"
          value={formData.propertyId}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        >
          <option value="">
            Select Property
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

      <div>
        <label className="block mb-1 font-medium">
          Unit
        </label>

        <select
          name="unitId"
          value={formData.unitId}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        >
          <option value="">
            Select Unit
          </option>

          {filteredUnits.map((unit) => (
            <option
              key={unit.id}
              value={unit.id}
            >
              Unit {unit.unitNumber}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <Input
        label="Amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <Input
        label="Transaction Date"
        name="transactionDate"
        type="date"
        value={formData.transactionDate}
        onChange={handleChange}
        required
      />

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}