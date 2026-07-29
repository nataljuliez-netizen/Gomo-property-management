import { supabase } from "../lib/supabase";

export async function getAuditLogs() {
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function addAuditLog({
  action,
  entity,
  entityId = null,
  description,
}) {
  const { data, error } = await supabase
    .from("audit_logs")
    .insert({
      profileId: null,
      action,
      entity,
      entityId,
      changes: {
        description,
      },
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function clearAuditLogs() {
  const { error } = await supabase
    .from("audit_logs")
    .delete()
    .neq("id", "");

  if (error) throw error;
}