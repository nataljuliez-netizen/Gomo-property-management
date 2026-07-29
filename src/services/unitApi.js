import { supabase } from "../lib/supabase";

export async function getUnits() {
  const { data, error } = await supabase
    .from("units")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function addUnit(unit) {
  const newUnit = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...unit,
  };

  const { data, error } = await supabase
    .from("units")
    .insert(newUnit)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateUnit(unit) {
  const updatedUnit = {
    ...unit,
    updatedAt: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("units")
    .update(updatedUnit)
    .eq("id", unit.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteUnit(id) {
  const { error } = await supabase
    .from("units")
    .delete()
    .eq("id", id);

  if (error) throw error;
}