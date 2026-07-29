import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getLandlords,
  addLandlord,
  updateLandlord,
  deleteLandlord,
} from "../services/landlordApi";

export function useLandlords() {
  return useQuery({
    queryKey: ["landlords"],
    queryFn: getLandlords,
  });
}

export function useAddLandlord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLandlord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landlords"] });
    },
  });
}

export function useUpdateLandlord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLandlord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landlords"] });
    },
  });
}

export function useDeleteLandlord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLandlord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landlords"] });
    },
  });
}