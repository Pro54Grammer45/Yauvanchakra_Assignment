## Error at src\services\httpService.ts

- function at line 16
```
import { InternalAxiosRequestConfig } from "axios";

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    let adminInfo: { token?: string } | null = null;
    let company: string | null = null;

    if (Cookies.get("adminInfo")) {
      adminInfo = JSON.parse(Cookies.get("adminInfo")!);
    }
    if (Cookies.get("company")) {
      company = Cookies.get("company")!;
    }

    // Use AxiosHeaders set method for type safety
    config.headers.set("authorization", adminInfo?.token ? `Bearer ${adminInfo.token}` : "");
    config.headers.set("company", company || "");

    return config;
  }
);

```

- headers at line 46
```
get: (url: string, config?: AxiosRequestConfig): Promise<any> =>
  instance.get(url, config).then(responseBody),

```

## Error at src\services\OrderServices.ts

- headers at lines 29,35
```
return requests.get(
      `/orders/all?invoice=${searchInvoice}`,
      {
        headers,
      }
    );


return requests.get(
  `/orders?customerName=${searchName}&status=${searchStatus}&day=${searchDay}&page=${page}&limit=${limit}&startDate=${startD}&endDate=${endD}&method=${searchMethod}`,
  {
    headers,
    // If you need to send query params (not body) for GET, use params: { ... }
    // params: { ... }
  }
);

```