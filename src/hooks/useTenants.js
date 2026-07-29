import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getTenants,
  addTenant,
  updateTenant,
  deleteTenant,
} from "../services/tenantApi";

export function useTenants() {
  const query = useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
  });

  return {
    tenants: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
  };
}

export function useAddTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
    },
  });
}

export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
    },
  });
}

export function useDeleteTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
    },
  });
}