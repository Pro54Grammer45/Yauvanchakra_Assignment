import requests from "./httpService";

const ProductServices = {
  getAllProducts: async ({ page, limit, category, title, price }: any): Promise<any> => {
    const searchCategory = category !== null ? category : "";
    const searchTitle = title !== null ? title : "";
    const searchPrice = price !== null ? price : "";

    return requests.get(
      `/products?page=${page}&limit=${limit}&category=${searchCategory}&title=${searchTitle}&price=${searchPrice}`
    );
  },

  getProductById: async (id: any): Promise<any> => {
    return requests.post(`/products/${id}`);
  },
  addProduct: async (body: any): Promise<any> => {
    return requests.post("/products/add", body);
  },
  addAllProducts: async (body: any): Promise<any> => {
    return requests.post("/products/all", body);
  },
  updateProduct: async (id: any, body: any): Promise<any> => {
    return requests.patch(`/products/${id}`, body);
  },
  updateManyProducts: async (body: any): Promise<any> => {
    return requests.patch("products/update/many", body);
  },
  updateStatus: async (id: any, body: any): Promise<any> => {
    return requests.put(`/products/status/${id}`, body);
  },

  deleteProduct: async (id: any): Promise<any> => {
    return requests.delete(`/products/${id}`);
  },
  deleteManyProducts: async (body: any): Promise<any> => {
    return requests.patch("/products/delete/many", body);
  },
};

export default ProductServices;
