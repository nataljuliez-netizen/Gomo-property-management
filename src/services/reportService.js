const STORAGE_KEY = "gomo_report_settings";

const DEFAULT_SETTINGS = {
  mortgage: 0,
  otherCosts: 0,
};

export function getReportSettings() {
  try {
    const settings = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    );

    return settings || DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveReportSettings(settings) {
  const updated = {
    mortgage: Number(settings.mortgage) || 0,
    otherCosts: Number(settings.otherCosts) || 0,
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  return updated;
}

export function resetReportSettings() {
  localStorage.removeItem(STORAGE_KEY);
}