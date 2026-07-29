import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../services/noteApi";

export function useNotes() {
  const query = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  return {
    notes: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
  };
}

export function useAddNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNote,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      }),
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      }),
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      }),
  });
}