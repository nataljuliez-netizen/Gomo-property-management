import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAuditLogs,
  addAuditLog,
  clearAuditLogs,
} from "../services/auditApi";

export function useAuditLogs() {
  const query = useQuery({
    queryKey: ["auditLogs"],
    queryFn: getAuditLogs,
  });

  return {
    logs: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
  };
}

export function useAddAuditLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAuditLog,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["auditLogs"],
      }),
  });
}

export function useClearAuditLogs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearAuditLogs,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["auditLogs"],
      }),
  });
}