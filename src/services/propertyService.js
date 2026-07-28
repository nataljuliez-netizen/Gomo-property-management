import { notifyDashboard } from "./dashboardEvents";
import { addAuditLog } from "./auditService";

const STORAGE_KEY = "gomo_properties";

export function getProperties() {
  const properties = localStorage.getItem(STORAGE_KEY);

  return properties ? JSON.parse(properties) : [];
}

function saveProperties(properties) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(properties)
  );
}

export function addProperty(property) {
  const properties = getProperties();

  const newProperty = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...property,
  };

  properties.push(newProperty);

  saveProperties(properties);
notifyDashboard();

  addAuditLog(
    "Created",
    `Added property "${property.name}"`
  );

  return newProperty;
}

export function updateProperty(updatedProperty) {
  const properties = getProperties();

  const updated = properties.map((property) =>
    property.id === updatedProperty.id
      ? {
          ...updatedProperty,
          updatedAt: new Date().toISOString(),
        }
      : property
  );

  saveProperties(updated);
notifyDashboard();

  addAuditLog(
    "Updated",
    `Updated property "${updatedProperty.name}"`
  );
}

export function deleteProperty(id) {
  const properties = getProperties();

  const property = properties.find(
    (p) => p.id === id
  );

  const updated = properties.filter(
    (p) => p.id !== id
  );

  saveProperties(updated);
notifyDashboard();

  if (property) {
    addAuditLog(
      "Deleted",
      `Deleted property "${property.name}"`
    );
  }
}