import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getProperties,
  addProperty,
  updateProperty,
  deleteProperty,
} from "../services/propertyApi";

export function useProperties() {
  const queryClient = useQueryClient();

  const propertiesQuery = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });

  const addMutation = useMutation({
    mutationFn: addProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
    },
  });

  return {
    properties: propertiesQuery.data ?? [],
    loading: propertiesQuery.isLoading,
    error: propertiesQuery.error,

    addProperty: addMutation.mutateAsync,
    updateProperty: updateMutation.mutateAsync,
    deleteProperty: deleteMutation.mutateAsync,

    refreshProperties: propertiesQuery.refetch,
  };
}