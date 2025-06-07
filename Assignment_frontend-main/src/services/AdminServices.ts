import requests from "./httpService";

const AdminServices = {
  registerAdmin: async (body: any): Promise<any> => {
    return requests.post("/admin/register", body);
  },

  loginAdmin: async (body: any): Promise<any> => {
    return requests.post(`/admin/login`, body);
  },

  forgetPassword: async (body: any): Promise<any> => {
    return requests.put("/admin/forget-password", body);
  },

  resetPassword: async (body: any): Promise<any> => {
    return requests.put("/admin/reset-password", body);
  },

  signUpWithProvider: async (body: any): Promise<any> => {
    return requests.post("/admin/signup", body);
  },

  addStaff: async (body: any): Promise<any> => {
    return requests.post("/admin/add", body);
  },
  getAllStaff: async (body: any): Promise<any> => {
    return requests.get("/admin", body);
  },
  getStaffById: async (id: any, body: any): Promise<any> => {
    return requests.post(`/admin/${id}`, body);
  },

  updateStaff: async (id: any, body: any): Promise<any> => {
    return requests.put(`/admin/${id}`, body);
  },

  updateStaffStatus: async (id: any, body: any): Promise<any> => {
    return requests.put(`/admin/update-status/${id}`, body);
  },

  deleteStaff: async (id: any): Promise<any> => {
    return requests.delete(`/admin/${id}`);
  },
};

export default AdminServices;
