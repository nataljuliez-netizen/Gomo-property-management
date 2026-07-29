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

    // Expenses
    "expense.view",
    "expense.create",
    "expense.edit",
    "expense.delete",

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
    // Dashboard
    "dashboard.view",

    // Properties
    "property.view",
    "property.create",
    "property.edit",

    // Units
    "unit.view",
    "unit.create",
    "unit.edit",

    // Tenants
    "tenant.view",
    "tenant.create",
    "tenant.edit",

    // Transactions
    "transaction.view",
    "transaction.create",
    "transaction.edit",

    // Expenses
    "expense.view",
    "expense.create",
    "expense.edit",

    // Documents
    "document.view",
    "document.create",
    "document.edit",

    // Notes
    "note.view",
    "note.create",
    "note.edit",
  ],

  [ROLES.BOOKKEEPER]: [
    // Dashboard
    "dashboard.view",

    // Transactions
    "transaction.view",
    "transaction.create",
    "transaction.edit",
    "transaction.delete",

    // Expenses
    "expense.view",
    "expense.create",
    "expense.edit",
    "expense.delete",

    // Documents
    "document.view",

    // Reports
    "report.view",
    "report.export",

    // Audit
    "audit.view",

    // Settings
    "settings.view",
  ],
};

export function can(permission) {
  const role = getCurrentRole();

  if (!role) {
    return false;
  }

  return permissions[role]?.includes(permission) ?? false;
}