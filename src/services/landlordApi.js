import { supabase } from "../lib/supabase";

export async function getLandlords() {
  const { data, error } = await supabase
    .from("landlords")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function addLandlord(landlord) {
  const newLandlord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...landlord,
  };

  const { data, error } = await supabase
    .from("landlords")
    .insert(newLandlord)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateLandlord(landlord) {
  const updatedLandlord = {
    ...landlord,
    updatedAt: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("landlords")
    .update(updatedLandlord)
    .eq("id", landlord.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteLandlord(id) {
  const { error } = await supabase
    .from("landlords")
    .delete()
    .eq("id", id);

  if (error) throw error;
}