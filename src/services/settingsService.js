const STORAGE_KEY = "gomo_settings";

const DEFAULT_SETTINGS = {
  companyName: "GOMO Property Management",
  ownerName: "",
  email: "",
  phone: "",
  currency: "R",
  dateFormat: "DD/MM/YYYY",
  theme: "Light",
};

export function getSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    return saved
      ? { ...DEFAULT_SETTINGS, ...saved }
      : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings)
  );
}

export function resetSettings() {
  localStorage.removeItem(STORAGE_KEY);
}