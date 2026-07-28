// src/pages/Settings.jsx

import { useEffect, useState } from "react";
import {
  Save,
  RotateCcw,
  Download,
  Upload,
} from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

import {
  getSettings,
  saveSettings,
  resetSettings,
} from "../services/settingsService";

export default function Settings() {
  const [settings, setSettings] = useState(getSettings());

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave() {
    saveSettings(settings);
    alert("Settings saved successfully.");
  }

  function handleReset() {
    const confirmed = window.confirm(
      "Reset all settings to default?"
    );

    if (!confirmed) return;

    resetSettings();
    setSettings(getSettings());

    alert("Settings reset.");
  }

  function handleExport() {
    const backup = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      backup[key] = localStorage.getItem(key);
    }

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "gomo-backup.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  function handleImport(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        Object.entries(data).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });

        alert(
          "Backup imported successfully.\nRefresh the page."
        );
      } catch {
        alert("Invalid backup file.");
      }
    };

    reader.readAsText(file);
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Settings"
        subtitle="Configure your GOMO application."
      />

      <Card>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <label className="mb-1 block font-medium">
              Company Name
            </label>

            <input
              className="w-full rounded-lg border p-2"
              name="companyName"
              value={settings.companyName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Owner Name
            </label>

            <input
              className="w-full rounded-lg border p-2"
              name="ownerName"
              value={settings.ownerName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Email
            </label>

            <input
              className="w-full rounded-lg border p-2"
              name="email"
              value={settings.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Phone
            </label>

            <input
              className="w-full rounded-lg border p-2"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Currency
            </label>

            <select
              className="w-full rounded-lg border p-2"
              name="currency"
              value={settings.currency}
              onChange={handleChange}
            >
              <option value="R">South African Rand (R)</option>
              <option value="$">US Dollar ($)</option>
              <option value="₹">Indian Rupee (₹)</option>
              <option value="£">British Pound (£)</option>
              <option value="€">Euro (€)</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Date Format
            </label>

            <select
              className="w-full rounded-lg border p-2"
              name="dateFormat"
              value={settings.dateFormat}
              onChange={handleChange}
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Theme
            </label>

            <select
              className="w-full rounded-lg border p-2"
              name="theme"
              value={settings.theme}
              onChange={handleChange}
            >
              <option>Light</option>
              <option>Dark (Coming Soon)</option>
            </select>
          </div>

        </div>

      </Card>

      <Card>

        <h2 className="mb-4 text-lg font-semibold">
          Backup & Restore
        </h2>

        <div className="flex flex-wrap gap-3">

          <Button onClick={handleExport}>
            <Download size={18} />
            Export Data
          </Button>

          <label className="cursor-pointer">

            <input
              hidden
              type="file"
              accept=".json"
              onChange={handleImport}
            />

            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
              <Upload size={18} />
              Import Data
            </div>

          </label>

        </div>

      </Card>

      <div className="flex flex-wrap gap-3">

        <Button onClick={handleSave}>
          <Save size={18} />
          Save Settings
        </Button>

        <Button onClick={handleReset}>
          <RotateCcw size={18} />
          Reset Settings
        </Button>

      </div>

    </div>
  );
}