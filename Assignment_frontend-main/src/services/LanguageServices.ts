import requests from './httpService';

const LanguageServices = {
  getAllLanguages: async (): Promise<any> => {
    return requests.get('/language/all');
  },

  getShowingLanguage: async (): Promise<any> => {
    return requests.get('/language/show');
  },

  getLanguageById: async (id: any): Promise<any> => {
    return requests.get(`/language/${id}`);
  },

  addLanguage: async (body: any): Promise<any> => {
    return requests.post('/language/add', body);
  },

  addAllLanguage: async (body: any): Promise<any> => {
    return requests.post('/language/add/all', body);
  },

  updateLanguage: async (id: any, body: any): Promise<any> => {
    return requests.put(`/language/${id}`, body);
  },

  updateManyLanguage: async (body: any): Promise<any> => {
    return requests.patch('language/update/many', body);
  },

  updateStatus: async (id: any, body: any): Promise<any> => {
    return requests.put(`/language/status/${id}`, body);
  },

  deleteLanguage: async (id: any, body: any): Promise<any> => {
    return requests.patch(`/language/${id}`, body);
  },

  deleteManyLanguage: async (body: any): Promise<any> => {
    return requests.patch('/language/delete/many', body);
  },
};

export default LanguageServices;
