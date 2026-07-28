import { getCurrentRole, ROLES } from "./authService";

const permissions = {
  [ROLES.LANDLORD]: [
    // Dashboard
    "dashboard.view",

    // Landlords
    "landlord.view",
    "landlord.create",
    "landlord.edit",
    "landlord.delete",

    // Properties
    "property.view",
    "property.create",
    "property.edit",
    "property.delete",

    // Units
    "unit.view",
    "unit.create",
    "unit.edit",
    "unit.delete",

    // Tenants
    "tenant.view",
    "tenant.create",
    "tenant.edit",
    "tenant.delete",

    // Transactions
    "transaction.view",
    "transaction.create",
    "transaction.edit",
    "transaction.delete",

    // Documents
    "document.view",
    "document.create",
    "document.edit",
    "document.delete",

    // Reports
    "report.view",
    "report.export",

    // Notes
    "note.view",
    "note.create",
    "note.edit",
    "note.delete",

    // Audit
    "audit.view",

    // Settings
    "settings.view",
    "settings.edit",
  ],

  [ROLES.PROPERTY_MANAGER]: [
    "dashboard.view",

    "property.view",
    "property.create",
    "property.edit",

    "unit.view",
    "unit.create",
    "unit.edit",

    "tenant.view",
    "tenant.create",
    "tenant.edit",

    "transaction.view",
    "transaction.create",
    "transaction.edit",

    "document.view",
    "document.create",
    "document.edit",

    "note.view",
    "note.create",
    "note.edit",
  ],

  [ROLES.BOOKKEEPER]: [
    "dashboard.view",

    "transaction.view",
    "transaction.create",
    "transaction.edit",

    "document.view",

    "report.view",
    "report.export",

    "audit.view",

    "settings.view",
  ],
};

export function can(permission) {
  const role = getCurrentRole();

  if (!role) return false;

  return permissions[role]?.includes(permission);
}