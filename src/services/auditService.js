const STORAGE_KEY = "gomo_audit_logs";

function getLogs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLogs(logs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getAllAuditLogs() {
  return getLogs().sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
}

export function addAuditLog(action, description) {
  const logs = getLogs();

  const log = {
    id: crypto.randomUUID(),
    action,
    description,
    timestamp: new Date().toISOString(),
  };

  logs.unshift(log);

  saveLogs(logs);

  return log;
}

export function clearAuditLogs() {
  localStorage.removeItem(STORAGE_KEY);
}