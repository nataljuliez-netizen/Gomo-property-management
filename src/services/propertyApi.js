import { supabase } from "../lib/supabase";

export async function getProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function addProperty(property) {
  const newProperty = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...property,
  };

  const { data, error } = await supabase
    .from("properties")
    .insert(newProperty)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateProperty(property) {
  const updatedProperty = {
    ...property,
    updatedAt: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("properties")
    .update(updatedProperty)
    .eq("id", property.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteProperty(id) {
  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", id);

  if (error) throw error;
}