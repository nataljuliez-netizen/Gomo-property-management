import { supabase } from "../lib/supabase";

export async function getTenants() {
  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function addTenant(tenant) {
  const newTenant = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...tenant,
  };

  const { data, error } = await supabase
    .from("tenants")
    .insert(newTenant)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateTenant(tenant) {
  const updatedTenant = {
    ...tenant,
    updatedAt: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("tenants")
    .update(updatedTenant)
    .eq("id", tenant.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteTenant(id) {
  const { error } = await supabase
    .from("tenants")
    .delete()
    .eq("id", id);

  if (error) throw error;
}