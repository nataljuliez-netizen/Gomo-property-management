// src/components/Transactions/TransactionForm.jsx

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
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    } else {
      setFormData({
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
      });
    }
  }, [transaction]);

  useEffect(() => {
    calculateValues();
  }, [formData.rentPayable, formData.rentPaid]);

  function calculateValues() {
    const payable = Number(formData.rentPayable) || 0;
    const paid = Number(formData.rentPaid) || 0;

    let due = payable - paid;

    if (due < 0) due = 0;

    let status = "Due";

    if (paid > 0 && paid < payable) {
      status = "Partially Paid";
    }

    if (paid >= payable && payable > 0) {
      status = "Paid";
    }

    setFormData((prev) => ({
      ...prev,
      rentDue: due,
      status,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const tenant = tenants.find(
      (t) => t.id === formData.tenantId
    );

    const property = properties.find(
      (p) => p.id === formData.propertyId
    );

    const unit = units.find(
      (u) => u.id === formData.unitId
    );

    onSubmit({
      ...formData,
      tenantName: tenant?.fullName ?? "",
      propertyName: property?.name ?? "",
      unitNumber: unit?.unitNumber ?? "",
    });
  }

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
              {tenant.fullName}
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

          {units.map((unit) => (
            <option
              key={unit.id}
              value={unit.id}
            >
              {unit.unitNumber}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Billing Period"
        name="billingPeriod"
        value={formData.billingPeriod}
        onChange={handleChange}
        required
      />

      <Input
        label="Rent Payable (R)"
        type="number"
        name="rentPayable"
        value={formData.rentPayable}
        onChange={handleChange}
        required
      />

      <Input
        label="Rent Paid (R)"
        type="number"
        name="rentPaid"
        value={formData.rentPaid}
        onChange={handleChange}
        required
      />

      <Input
        label="Rent Due (R)"
        value={formData.rentDue}
        readOnly
      />

      <Input
        label="Due Date"
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        required
      />

      <Input
        label="Payment Date"
        type="date"
        name="paymentDate"
        value={formData.paymentDate}
        onChange={handleChange}
      />

      <Input
        label="Status"
        value={formData.status}
        readOnly
      />

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
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Save Transaction
        </button>
      </div>
    </form>
  );
}