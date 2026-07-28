import { Input, TextArea } from "../common";

export default function TenantForm({
  formData,
  handleChange,
  handleSubmit,
  units,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <Input
        label="National ID / Passport"
        name="idNumber"
        value={formData.idNumber}
        onChange={handleChange}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Assigned Unit
        </label>

        <select
          name="unitId"
          value={formData.unitId}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        >
          <option value="">
            Select Unit
          </option>

          {units.map((unit) => (
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
        label="Move-in Date"
        type="date"
        name="moveInDate"
        value={formData.moveInDate}
        onChange={handleChange}
      />

      <TextArea
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
      />
    </form>
  );
}