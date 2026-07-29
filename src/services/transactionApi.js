import { supabase } from "../lib/supabase";

export async function getTransactions() {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("transactionDate", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function addTransaction(transaction) {
  const newTransaction = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...transaction,
  };

  const { data, error } = await supabase
    .from("transactions")
    .insert(newTransaction)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateTransaction(transaction) {
  const updatedTransaction = {
    ...transaction,
    updatedAt: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("transactions")
    .update(updatedTransaction)
    .eq("id", transaction.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteTransaction(id) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) throw error;
}