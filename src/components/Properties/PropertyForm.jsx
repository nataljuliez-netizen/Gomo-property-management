import { Input, TextArea } from "../common";

export default function PropertyForm({
  formData,
  handleChange,
  handleSubmit,
  landlords,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        label="Property Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Property Type
        </label>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        >
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Complex">Complex</option>
          <option value="Commercial">Commercial</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <Input
        label="Street Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <Input
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
      />

      <Input
        label="Province"
        name="province"
        value={formData.province}
        onChange={handleChange}
      />

      <Input
        label="Postal Code"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Landlord
        </label>

        <select
          name="landlordId"
          value={formData.landlordId}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        >
          <option value="">
            Select Landlord
          </option>

          {landlords.map((landlord) => (
            <option
              key={landlord.id}
              value={landlord.id}
            >
              {landlord.name}
            </option>
          ))}
        </select>
      </div>

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
          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
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