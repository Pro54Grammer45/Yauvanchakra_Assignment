import requests from "@/services/httpService";

const NotificationServices = {
  addNotification: async (body: any): Promise<any> => {
    return requests.post("/notification/add", body);
  },

  getAllNotification: async (page: any): Promise<any> => {
    return requests.get(`/notification?page=${page}`);
  },

  updateStatusNotification: async (id: any, body: any): Promise<any> => {
    return requests.put(`/notification/${id}`, body);
  },

  updateManyStatusNotification: async (body: any): Promise<any> => {
    return requests.patch("/notification/update/many", body);
  },

  deleteNotification: async (id: any): Promise<any> => {
    return requests.delete(`/notification/${id}`);
  },

  deleteNotificationByProductId: async (id: any): Promise<any> => {
    return requests.delete(`/notification/product-id/${id}`);
  },

  deleteManyNotification: async (body: any): Promise<any> => {
    return requests.patch(`/notification/delete/many`, body);
  },
};

export default NotificationServices;
