import { supabase } from "../lib/supabase";

export async function getNotes() {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function addNote(note) {
  const { data, error } = await supabase
    .from("notes")
    .insert(note)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateNote(note) {
  const { data, error } = await supabase
    .from("notes")
    .update(note)
    .eq("id", note.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteNote(id) {
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return id;
}