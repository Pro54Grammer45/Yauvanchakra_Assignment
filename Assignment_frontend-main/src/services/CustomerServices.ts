import requests from "./httpService";

const CustomerServices = {
  getAllCustomers: async ({ searchText = "" }: any): Promise<any> => {
    return requests.get(`/customer?searchText=${searchText}`);
  },

  addAllCustomers: async (body: any): Promise<any> => {
    return requests.post("/customer/add/all", body);
  },
  // user create
  createCustomer: async (body: any): Promise<any> => {
    return requests.post(`/customer/create`, body);
  },

  filterCustomer: async (email: any): Promise<any> => {
    return requests.post(`/customer/filter/${email}`);
  },

  getCustomerById: async (id: any): Promise<any> => {
    return requests.get(`/customer/${id}`);
  },

  updateCustomer: async (id: any, body: any): Promise<any> => {
    return requests.put(`/customer/${id}`, body);
  },

  deleteCustomer: async (id: any): Promise<any> => {
    return requests.delete(`/customer/${id}`);
  },
};

export default CustomerServices;
