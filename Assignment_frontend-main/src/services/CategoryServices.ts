import requests from "./httpService";

const CategoryServices = {
  getAllCategory: async (): Promise<any> => {
    return requests.get("/category");
  },

  getAllCategories: async (): Promise<any> => {
    return requests.get("/category/all");
  },

  getCategoryById: async (id: any): Promise<any> => {
    return requests.get(`/category/${id}`);
  },

  addCategory: async (body: any): Promise<any> => {
    return requests.post("/category/add", body);
  },

  addAllCategory: async (body: any): Promise<any> => {
    return requests.post("/category/add/all", body);
  },

  updateCategory: async (id: any, body: any): Promise<any> => {
    return requests.put(`/category/${id}`, body);
  },

  updateStatus: async (id: any, body: any): Promise<any> => {
    return requests.put(`/category/status/${id}`, body);
  },

  deleteCategory: async (id: any, body: any): Promise<any> => {
    return requests.delete(`/category/${id}`, body);
  },

  updateManyCategory: async (body: any): Promise<any> => {
    return requests.patch("/category/update/many", body);
  },

  deleteManyCategory: async (body: any): Promise<any> => {
    return requests.patch("/category/delete/many", body);
  },
};

export default CategoryServices;
