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
  // Check for linked transactions
  const { count, error: countError } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .eq("propertyId", id);

  if (countError) throw countError;

  if ((count ?? 0) > 0) {
    throw new Error(
      `This property cannot be deleted because it has ${count} transaction${count === 1 ? "" : "s"} associated with it. Please delete those transactions first.`
    );
  }

  // Delete property
  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", id);

  if (error) throw error;
}