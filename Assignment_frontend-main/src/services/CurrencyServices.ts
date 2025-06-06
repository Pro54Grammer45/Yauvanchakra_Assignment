import requests from './httpService';

const CurrencyServices = {
  getAllCurrency: async (): Promise<any> => {
    return requests.get('/currency');
  },

  getShowingCurrency: async (): Promise<any> => {
    return requests.get('/currency/show');
  },

  getCurrencyById: async (id: any): Promise<any> => {
    return requests.get(`/currency/${id}`);
  },

  addCurrency: async (body: any): Promise<any> => {
    return requests.post('/currency/add', body);
  },

  addAllCurrency: async (body: any): Promise<any> => {
    return requests.post('/currency/add/all', body);
  },

  updateCurrency: async (id: any, body: any): Promise<any> => {
    return requests.put(`/currency/${id}`, body);
  },

  updateManyCurrencies: async (body: any): Promise<any> => {
    return requests.patch('currency/update/many', body);
  },

  updateEnabledStatus: async (id: any, body: any): Promise<any> => {
    return requests.put(`/currency/status/enabled/${id}`, body);
  },

  updateLiveExchangeRateStatus: async (id: any, body: any): Promise<any> => {
    return requests.put(`/currency/status/live-exchange-rates/${id}`, body);
  },

  deleteCurrency: async (id: any, body: any): Promise<any> => {
    return requests.delete(`/currency/${id}`, body);
  },

  deleteManyCurrency: async (body: any): Promise<any> => {
    return requests.patch('/currency/delete/many', body);
  },
};

export default CurrencyServices;
