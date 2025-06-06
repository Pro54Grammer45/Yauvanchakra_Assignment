import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor with proper type annotation
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    let adminInfo: { token?: string } | null = null;
    let company: string | null = null;

    if (Cookies.get("adminInfo")) {
      adminInfo = JSON.parse(Cookies.get("adminInfo")!);
      console.log("Parsed adminInfo from cookie:", adminInfo);
    }else{
      console.log("adminInfo cookie not found.");
    }

    if (Cookies.get("company")) {
      company = Cookies.get("company")!;
    }

    // Proper header assignment using AxiosHeaders
    config.headers.set("authorization", adminInfo?.token ? `Bearer ${adminInfo.token}` : "");
    config.headers.set("company", company || "");
    console.log("Authorization Header being set:", config.headers.get("authorization")); // <-- ADD THIS
    console.log("Company Header being set:", config.headers.get("company")); // <-- ADD THIS

    return config;
  }
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, config?: AxiosRequestConfig): Promise<any> =>
    instance.get(url, config).then(responseBody),

  post: (url: string, body?: any, config?: AxiosRequestConfig): Promise<any> =>
    instance.post(url, body, config).then(responseBody),

  put: (url: string, body?: any, config?: AxiosRequestConfig): Promise<any> =>
    instance.put(url, body, config).then(responseBody),

  patch: (url: string, body?: any, config?: AxiosRequestConfig): Promise<any> =>
    instance.patch(url, body, config).then(responseBody),

  delete: (url: string, config?: AxiosRequestConfig): Promise<any> =>
    instance.delete(url, config).then(responseBody),
};

export default requests;
