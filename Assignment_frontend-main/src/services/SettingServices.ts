import requests from "./httpService";

const SettingServices = {
  // global setting all function
  addGlobalSetting: async (body: any) => {
    return requests.post("/setting/global/add", body);
  },

  getGlobalSetting: async (): Promise<any> => {
    return requests.get("/setting/global");
  },

  updateGlobalSetting: async (body: any) => {
    return requests.put(`/setting/global/update`, body);
  },

  // store setting all function
  addStoreSetting: async (body: any) => {
    return requests.post("/setting/store-setting/add", body);
  },

  getStoreSetting: async (): Promise<any> => {
    return requests.get("/setting/store-setting/all");
  },

  updateStoreSetting: async (body: any) => {
    return requests.put(`/setting/store-setting/update`, body);
  },

  // store customization setting all function
  addStoreCustomizationSetting: async (body: any) => {
    return requests.post("/setting/store/customization/add", body);
  },

  getStoreCustomizationSetting: async (): Promise<any> => {
    return requests.get("/setting/store/customization/all");
  },

  updateStoreCustomizationSetting: async (body: any) => {
    return requests.put(`/setting/store/customization/update`, body);
  },

  getAllSettings: async (): Promise<any> => {
    return requests.get("/settings");
  },

  getSettingById: async (id: any): Promise<any> => {
    return requests.get(`/settings/${id}`);
  },

  addSetting: async (body: any): Promise<any> => {
    return requests.post("/settings/add", body);
  },

  updateSetting: async (id: any, body: any): Promise<any> => {
    return requests.put(`/settings/${id}`, body);
  },

  deleteSetting: async (id: any): Promise<any> => {
    return requests.delete(`/settings/${id}`);
  },
};

export default SettingServices;
