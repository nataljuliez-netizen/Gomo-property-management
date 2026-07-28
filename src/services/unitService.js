import { notifyDashboard } from "./dashboardEvents";
import { addAuditLog } from "./auditService";

const STORAGE_KEY = "gomo_units";

export function getUnits() {
  const units = localStorage.getItem(STORAGE_KEY);

  return units ? JSON.parse(units) : [];
}

function saveUnits(units) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(units)
  );
}

export function addUnit(unit) {
  const units = getUnits();

  const newUnit = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...unit,
  };

  units.push(newUnit);

  saveUnits(units);
notifyDashboard();

  addAuditLog(
    "Created",
    `Added unit "${unit.unitNumber}"`
  );

  return newUnit;
}

export function updateUnit(updatedUnit) {
  const units = getUnits();

  const updated = units.map((unit) =>
    unit.id === updatedUnit.id
      ? {
          ...updatedUnit,
          updatedAt: new Date().toISOString(),
        }
      : unit
  );

  saveUnits(updated);
notifyDashboard();

  addAuditLog(
    "Updated",
    `Updated unit "${updatedUnit.unitNumber}"`
  );
}

export function deleteUnit(id) {
  const units = getUnits();

  const unit = units.find((u) => u.id === id);

  const updated = units.filter(
    (u) => u.id !== id
  );

  saveUnits(updated);
notifyDashboard();

  if (unit) {
    addAuditLog(
      "Deleted",
      `Deleted unit "${unit.unitNumber}"`
    );
  }
}