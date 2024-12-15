import axios, { AxiosInstance, AxiosProgressEvent, AxiosResponse } from "axios";
import { toast } from "sonner";

// ============ Service Adapter ==============
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
apiClient.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => response.data,
  (error) => {
    toast.error(error?.message);
    return Promise.reject(error);
  }
);

// ============ Service Functions ==============
export const Get = async <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url, { params });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const Post = async <T>(
  url: string,
  data: Record<string, unknown>,
  config?: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await apiClient.post<T>(url, data, config);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
export const Update = async <T>(
  url: string,
  data: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await apiClient.put<T>(url, data);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
export const Delete = async <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await apiClient.delete<T>(url, { params });
    return response?.data;
  } catch (error) {
    throw error;
  }
};
export const Upload = async <T>(
  url: string,
  formData: FormData,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<T> => {
  try {
    const response = await apiClient.post<T>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

// ============ Use Service ==============
export const CallSignIn = (data: Record<string, unknown>) =>
  Post("/signin", data);
export const CallSignUp = (data: Record<string, unknown>) =>
  Post("/signup", data);
