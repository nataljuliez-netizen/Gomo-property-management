import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getUnits,
  addUnit,
  updateUnit,
  deleteUnit,
} from "../services/unitApi";

export function useUnits() {
  const query = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });

  return {
    units: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
  };
}

export function useAddUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUnit,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["units"],
      }),
  });
}

export function useUpdateUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUnit,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["units"],
      }),
  });
}

export function useDeleteUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUnit,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["units"],
      }),
  });
}