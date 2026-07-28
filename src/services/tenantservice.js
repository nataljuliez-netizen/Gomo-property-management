// src/services/tenantService.js

import { addAuditLog } from "./auditService";
import { notifyDashboard } from "./dashboardEvents";

const STORAGE_KEY = "gomo_tenants";

export function getTenants() {
  const tenants = localStorage.getItem(STORAGE_KEY);
  return tenants ? JSON.parse(tenants) : [];
}

function saveTenants(tenants) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tenants)
  );
}

export function addTenant(tenant) {
  const tenants = getTenants();

  const newTenant = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...tenant,
  };

  tenants.push(newTenant);

  saveTenants(tenants);
  notifyDashboard();

  addAuditLog(
    "Created",
    `Added tenant "${tenant.fullName}"`
  );

  return newTenant;
}

export function updateTenant(updatedTenant) {
  const tenants = getTenants();

  const updated = tenants.map((tenant) =>
    tenant.id === updatedTenant.id
      ? {
          ...updatedTenant,
          updatedAt: new Date().toISOString(),
        }
      : tenant
  );

  saveTenants(updated);
  notifyDashboard();

  addAuditLog(
    "Updated",
    `Updated tenant "${updatedTenant.fullName}"`
  );
}

export function deleteTenant(id) {
  const tenants = getTenants();

  const tenant = tenants.find(
    (t) => t.id === id
  );

  const updated = tenants.filter(
    (t) => t.id !== id
  );

  saveTenants(updated);
  notifyDashboard();

  if (tenant) {
    addAuditLog(
      "Deleted",
      `Deleted tenant "${tenant.fullName}"`
    );
  }
}