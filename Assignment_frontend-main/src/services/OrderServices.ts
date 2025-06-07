
import requests from "./httpService";

const OrderServices = {
  getAllOrders: async ({
    headers,
    customerName,
    status,
    page = 1,
    limit = 8,
    day,
    method,
    startDate,
    endDate,
  }: any): Promise<any> => {
    const searchName = customerName !== null ? customerName : "";
    const searchStatus = status !== null ? status : "";
    const searchDay = day !== null ? day : "";
    const searchMethod = method !== null ? method : "";
    const startD = startDate !== null ? startDate : "";
    const endD = endDate !== null ? endDate : "";

    return requests.get(
      `/orders?customerName=${searchName}&status=${searchStatus}&day=${searchDay}&page=${page}&limit=${limit}&startDate=${startD}&endDate=${endD}&method=${searchMethod}`,
      {
        headers,
      }
    );
  },

  getAllOrdersTwo: async ({ invoice, headers }: any): Promise<any> => {
    const searchInvoice = invoice !== null ? invoice : "";
    return requests.get(
      `/orders/all?invoice=${searchInvoice}`,
      {
        headers,
      }
    );
  },

  getRecentOrders: async ({
    page = 1,
    limit = 8,
    startDate = "1:00",
    endDate = "23:59",
  }: any): Promise<any> => {
    return requests.get(
      `/orders/recent?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
    );
  },

  getOrderCustomer: async (id: any, config?: any): Promise<any> => {
    // If you need to send headers or params, pass them as config
    return requests.get(`/orders/customer/${id}`, config);
  },

  getOrderById: async (id: any, config?: any): Promise<any> => {
    // If you need to send headers or params, pass them as config
    return requests.get(`/orders/${id}`, config);
  },

  updateOrder: async (id: any, body: any, config?: any): Promise<any> => {
    return requests.put(`/orders/${id}`, body, config);
  },

  deleteOrder: async (id: any, config?: any): Promise<any> => {
    return requests.delete(`/orders/${id}`, config);
  },

  getDashboardOrdersData: async ({
    page = 1,
    limit = 8,
    endDate = "23:59",
  }: any): Promise<any> => {
    return requests.get(
      `/orders/dashboard?page=${page}&limit=${limit}&endDate=${endDate}`
    );
  },

  getDashboardAmount: async (config?: any): Promise<any> => {
    return requests.get("/orders/dashboard-amount", config);
  },

  getDashboardCount: async (config?: any): Promise<any> => {
    return requests.get("/orders/dashboard-count", config);
  },

  getDashboardRecentOrder: async ({ page = 1, limit = 8 }: any): Promise<any> => {
    return requests.get(
      `/orders/dashboard-recent-order?page=${page}&limit=${limit}`
    );
  },

  getBestSellerProductChart: async (config?: any): Promise<any> => {
    return requests.get("/orders/dashboard/best-seller", config);
  },

  //for sending email invoice to customer
  sendEmailInvoiceToCustomer: async (body: any, config?: any): Promise<any> => {
    return requests.post("/order/customer/invoice", body, config);
  },
};

export default OrderServices;
