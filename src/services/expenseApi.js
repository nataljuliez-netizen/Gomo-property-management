import { supabase } from "../lib/supabase";

export async function getExpenses() {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("expenseDate", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function addExpense(expense) {
  const newExpense = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...expense,
  };

  const { data, error } = await supabase
    .from("expenses")
    .insert(newExpense)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateExpense(expense) {
  const updatedExpense = {
    ...expense,
    updatedAt: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("expenses")
    .update(updatedExpense)
    .eq("id", expense.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteExpense(id) {
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", id);

  if (error) throw error;
}