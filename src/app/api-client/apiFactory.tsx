import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosInstance, AxiosResponse, isAxiosError } from "axios";
import queryClient from "./QueryClient";

// Toast service for displaying errors
const toastService = {
  error: (message: string) => {
    console.log({ message });
  },
};

type HttpMethod = "post" | "put" | "patch" | "delete";

// Mutation context to store previous data for rollback in case of failure
export type MutationContext<TOptimisticData> =
  | {
      previousData: TOptimisticData | undefined;
    }
  | undefined;

interface CreateMutationParams<TData, TParams, TBody, TOptimisticData> {
  apiClient: AxiosInstance;
  method: HttpMethod;
  url: string; // URL can have dynamic parts (e.g., `/api/resource/${id}`)
  optimisticUpdate?: (
    previousValue: TOptimisticData | undefined,
    variables: TBody,
    params?: TParams,
  ) => TOptimisticData | undefined;
  errorMessage?: string | ((error: AxiosError) => string | null);
  invalidateQueryKey?: unknown[];
  mutationOptions?: Omit<
    UseMutationOptions<
      TData,
      AxiosError,
      { params?: TParams; body?: TBody },
      MutationContext<TOptimisticData>
    >,
    "mutationFn"
  >;
}

export function useCreateMutation<
  TParams extends Record<string, any> = Record<string, any>,
  TBody = unknown,
  TData = unknown,
  TOptimisticData = unknown,
>({
  apiClient,
  method,
  url,
  optimisticUpdate,
  errorMessage,
  invalidateQueryKey,
  mutationOptions,
}: CreateMutationParams<TData, TParams, TBody, TOptimisticData>) {
  return useMutation<
    TData,
    AxiosError,
    { params?: TParams; body?: TBody },
    MutationContext<TOptimisticData>
  >({
    mutationFn: async ({ params, body }) => {
      // Handle dynamic URL parts with variable replacement using params
      const finalUrl = url.replace(/\${(.*?)}/g, (_, key) => {
        const paramValue = params?.[key];
        if (!paramValue) {
          throw new Error(`Missing parameter for URL: ${key}`);
        }
        return paramValue;
      });

      try {
        const response: AxiosResponse<TData> = await apiClient({
          url: finalUrl,
          method,
          data: body,
        });

        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (
            axiosError.response?.status !== 401 &&
            axiosError.response?.status !== 403
          ) {
            const errMessage =
              typeof errorMessage === "function"
                ? errorMessage(axiosError)
                : errorMessage || "An error occurred";

            if (errMessage) {
              toastService.error(errMessage);
            }
          }
        }
        throw error;
      }
    },

    onMutate: async (variables): Promise<MutationContext<TOptimisticData>> => {
      if (invalidateQueryKey && optimisticUpdate) {
        await queryClient.cancelQueries({
          queryKey: invalidateQueryKey,
        });

        const previousData =
          queryClient.getQueryData<TOptimisticData>(invalidateQueryKey);

        if (previousData) {
          queryClient.setQueryData<TOptimisticData>(invalidateQueryKey, (pv) =>
            optimisticUpdate(pv, variables.body!, variables.params),
          );
        }

        return { previousData };
      }
      return undefined;
    },

    onError: (err, variables, context) => {
      if (invalidateQueryKey && context?.previousData !== undefined) {
        queryClient.setQueryData<TOptimisticData>(
          invalidateQueryKey,
          context.previousData,
        );
      }
      if (mutationOptions?.onError) {
        mutationOptions.onError(err, variables, context);
      }
    },

    onSettled: async () => {
      if (invalidateQueryKey) {
        await queryClient.invalidateQueries({
          queryKey: invalidateQueryKey,
        });
      }
    },
    ...mutationOptions,
  });
}
