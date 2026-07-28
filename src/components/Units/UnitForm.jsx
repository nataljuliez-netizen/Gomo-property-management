import { Input, TextArea } from "../common";

export default function UnitForm({
  formData,
  handleChange,
  handleSubmit,
  properties,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        label="Unit Number"
        name="unitNumber"
        value={formData.unitNumber}
        onChange={handleChange}
        required
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Property
        </label>

        <select
          name="propertyId"
          value={formData.propertyId}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200"
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

      <Input
        label="Bedrooms"
        type="number"
        name="bedrooms"
        value={formData.bedrooms}
        onChange={handleChange}
      />

      <Input
        label="Bathrooms"
        type="number"
        name="bathrooms"
        value={formData.bathrooms}
        onChange={handleChange}
      />

      <Input
        label="Monthly Rent"
        type="number"
        name="rent"
        value={formData.rent}
        onChange={handleChange}
      />

      <Input
        label="Deposit"
        type="number"
        name="deposit"
        value={formData.deposit}
        onChange={handleChange}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        >
          <option value="Vacant">
            Vacant
          </option>

          <option value="Occupied">
            Occupied
          </option>

          <option value="Maintenance">
            Maintenance
          </option>
        </select>
      </div>

      <TextArea
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
      />
    </form>
  );
}