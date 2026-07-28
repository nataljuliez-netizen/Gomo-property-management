import { addAuditLog } from "./auditService";

const STORAGE_KEY = "gomo_landlords";

export function getLandlords() {
  const landlords = localStorage.getItem(STORAGE_KEY);

  return landlords ? JSON.parse(landlords) : [];
}

function saveLandlords(landlords) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(landlords)
  );
}

export function addLandlord(landlord) {
  const landlords = getLandlords();

  const newLandlord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...landlord,
  };

  landlords.push(newLandlord);

  saveLandlords(landlords);

  addAuditLog(
    "Created",
    `Added landlord "${landlord.name}"`
  );

  return newLandlord;
}

export function updateLandlord(updatedLandlord) {
  const landlords = getLandlords();

  const updated = landlords.map((landlord) =>
    landlord.id === updatedLandlord.id
      ? {
          ...updatedLandlord,
          updatedAt: new Date().toISOString(),
        }
      : landlord
  );

  saveLandlords(updated);

  addAuditLog(
    "Updated",
    `Updated landlord "${updatedLandlord.name}"`
  );
}

export function deleteLandlord(id) {
  const landlords = getLandlords();

  const landlord = landlords.find((l) => l.id === id);

  const updated = landlords.filter((l) => l.id !== id);

  saveLandlords(updated);

  if (landlord) {
    addAuditLog(
      "Deleted",
      `Deleted landlord "${landlord.name}"`
    );
  }
}