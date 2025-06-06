import requests from './httpService';

const AttributeServices = {
  getAllAttributes: async ({ type, option, option1 }: any): Promise<any> => {
    return requests.get(
      `/attributes?type=${type}&option=${option}&option1=${option1}`
    );
  },

  getShowingAttributes: async (body: any): Promise<any> => {
    return requests.get('/attributes/show', body);
  },

  addAttribute: async (body: any): Promise<any> => {
    return requests.post('/attributes/add', body);
  },

  addChildAttribute: async (id: any, body: any): Promise<any> => {
    return requests.put(`/attributes/add/child/${id}`, body);
  },

  addAllAttributes: async (body: any): Promise<any> => {
    return requests.post('/attributes/add/all', body);
  },

  getAttributeById: async (id: any): Promise<any> => {
    return requests.get(`/attributes/${id}`);
  },

  getChildAttributeById: async ({ id, ids }: any): Promise<any> => {
    return requests.get(`/attributes/child/${id}/${ids}`);
  },

  updateAttributes: async (id: any, body: any): Promise<any> => {
    return requests.put(`/attributes/${id}`, body);
  },

  updateChildAttributes: async ({ id, ids }: any, body: any): Promise<any> => {
    return requests.put(`/attributes/update/child/${ids}/${id}`, body);
  },

  updateStatus: async (id: any, body: any): Promise<any> => {
    return requests.put(`/attributes/status/${id}`, body);
  },

  updateChildStatus: async (id: any, body: any): Promise<any> => {
    return requests.put(`/attributes/status/child/${id}`, body);
  },

  deleteAttribute: async (id: any, body: any): Promise<any> => {
    return requests.delete(`/attributes/${id}`, body);
  },

  deleteChildAttribute: async ({ id, ids }: any, body: any): Promise<any> => {
    return requests.put(`/attributes/delete/child/${ids}/${id}`, body);
  },

  updateManyAttribute: async (body: any): Promise<any> => {
    return requests.patch('/attributes/update/many', body);
  },

  updateManyChildAttribute: async (body: any): Promise<any> => {
    return requests.patch('/attributes/update/child/many', body);
  },

  deleteManyAttribute: async (body: any): Promise<any> => {
    return requests.patch('/attributes/delete/many', body);
  },

  deleteManyChildAttribute: async (body: any): Promise<any> => {
    return requests.patch('/attributes/delete/child/many', body);
  },
};

export default AttributeServices;
