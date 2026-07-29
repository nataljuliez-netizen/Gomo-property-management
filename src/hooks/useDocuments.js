import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getDocuments,
  uploadDocument,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../services/documentApi";

export function useDocuments() {
  const query = useQuery({
    queryKey: ["documents"],
    queryFn: getDocuments,
  });

  return {
    documents: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
  };
}

export function useUploadDocument() {
  return useMutation({
    mutationFn: uploadDocument,
  });
}

export function useAddDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (document) => {
      let uploadedFile = {};

      if (document.file) {
        uploadedFile = await uploadDocument(document.file);
      }

      return addDocument({
        ...document,
        ...uploadedFile,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },
  });
}

export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (document) => {
      let uploadedFile = {};

      if (document.file) {
        uploadedFile = await uploadDocument(document.file);
      }

      return updateDocument({
        ...document,
        ...uploadedFile,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },
  });
}