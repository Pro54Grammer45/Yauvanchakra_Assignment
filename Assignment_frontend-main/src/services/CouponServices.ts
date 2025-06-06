import requests from './httpService';

const CouponServices = {
  addCoupon: async (body: any): Promise<any> => {
    return requests.post('/coupon/add', body);
  },
  addAllCoupon: async (body: any): Promise<any> => {
    return requests.post('/coupon/add/all', body);
  },
  getAllCoupons: async (): Promise<any> => {
    return requests.get('/coupon');
  },
  getCouponById: async (id: any): Promise<any> => {
    return requests.get(`/coupon/${id}`);
  },
  updateCoupon: async (id: any, body: any): Promise<any> => {
    return requests.put(`/coupon/${id}`, body);
  },
  updateManyCoupons: async (body: any): Promise<any> => {
    return requests.patch('/coupon/update/many', body);
  },
  updateStatus: async (id: any, body: any): Promise<any> => {
    return requests.put(`/coupon/status/${id}`, body);
  },
  deleteCoupon: async (id: any): Promise<any> => {
    return requests.delete(`/coupon/${id}`);
  },
  deleteManyCoupons: async (body: any): Promise<any> => {
    return requests.patch(`/coupon/delete/many`, body);
  },
};

export default CouponServices;
