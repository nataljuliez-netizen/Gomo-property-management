import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseApi";

export function useExpenses() {
  const query = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  return {
    expenses: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
  };
}

export function useAddExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
}