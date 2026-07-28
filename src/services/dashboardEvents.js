export function notifyDashboard() {
  window.dispatchEvent(new Event("gomo-data-changed"));
}