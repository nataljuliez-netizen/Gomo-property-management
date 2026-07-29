import { supabase } from "../lib/supabase";

export async function getDocuments() {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("uploadedAt", { ascending: false });

  console.log("Documents error:", error);
  console.log("Documents data:", data);

  if (error) throw error;

  return data ?? [];
}

export async function uploadDocument(file) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("documents")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("documents")
    .getPublicUrl(fileName);

  return {
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
    fileUrl: data.publicUrl,
  };
}

export async function addDocument(document) {
  const { file, ...documentData } = document;

  const { data, error } = await supabase
    .from("documents")
    .insert({
      ...documentData,
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateDocument(document) {
  const { file, ...documentData } = document;

  const { data, error } = await supabase
    .from("documents")
    .update({
      ...documentData,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", document.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteDocument(id) {
  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return id;
}
export function validateDocumentFile(file) {
  if (!file) {
    return "Please select a file.";
  }

  const maxSize = 10 * 1024 * 1024; // 10MB

  if (file.size > maxSize) {
    return "File size must be less than 10MB.";
  }

  return null;
}