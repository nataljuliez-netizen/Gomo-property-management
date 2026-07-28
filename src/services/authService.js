const STORAGE_KEY = "gomo_current_role";

export const ROLES = {
  LANDLORD: "Landlord",
  PROPERTY_MANAGER: "Property Manager",
  BOOKKEEPER: "Bookkeeper",
};

export function getCurrentRole() {
  return localStorage.getItem(STORAGE_KEY);
}

export function selectRole(role) {
  localStorage.setItem(STORAGE_KEY, role);
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function isLoggedIn() {
  return !!getCurrentRole();
}