import axios, { AxiosError, CreateAxiosDefaults, ResponseType } from "axios";

type ApiMethod = "get" | "post" | "put" | "patch" | "delete";

const toastService = {
  //TODO : will be replaced with toast component.
  error: (message: string) => {},
};

const createApiClient = ({
  baseURL,
  method,
  responseType,
  options,
  headers,
  getToken,
  logout,
}: {
  baseURL: string;
  method: ApiMethod;
  responseType: ResponseType;
  getToken: () => string | undefined | null;
  logout: () => void;
  headers?: CreateAxiosDefaults["headers"];
  options?: Omit<
    CreateAxiosDefaults,
    "baseURL" | "method" | "responseType" | "headers"
  >;
}) => {
  const apiClient = axios.create({
    baseURL: baseURL,
    method: method,
    responseType: responseType,
    headers: headers ?? { "Content-Type": "application/json" },
    ...options,
  });

  apiClient.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status;
      if (status === 401) {
        logout();
        toastService.error("You have no access.");
      }
      Promise.reject(error);
    },
  );

  return apiClient;
};

export default createApiClient;
