import { ROLES } from "./authService";

export const rolePermissions = {
  [ROLES.LANDLORD]: [
    "/",
    "/landlords",
    "/properties",
    "/units",
    "/tenants",
    "/transactions",
    "/documents",
    "/reports",
    "/notes",
    "/settings",
  ],

  [ROLES.PROPERTY_MANAGER]: [
    "/",
    "/properties",
    "/units",
    "/tenants",
    "/transactions",
    "/documents",
    "/notes",
  ],

  [ROLES.BOOKKEEPER]: [
    "/",
    "/transactions",
    "/reports",
    "/documents",
    "/audit-log",
    "/settings",
  ],
};