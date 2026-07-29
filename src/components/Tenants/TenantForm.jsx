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
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

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

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Lease Start"
          type="date"
          name="leaseStart"
          value={formData.leaseStart}
          onChange={handleChange}
        />

        <Input
          label="Lease End"
          type="date"
          name="leaseEnd"
          value={formData.leaseEnd}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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

          <option value="Notice">
            Notice
          </option>

          <option value="Former">
            Former
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