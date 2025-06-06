"use client";
export interface Order {
    _id: string;
    invoice: string;
    updatedDate: string;
    user_info: {
        name: string;
        [key: string]: any;
    };
    paymentMethod: string;
    createdAt: string | Date;
    total: number;
    status: 'Delivered' | 'Pending' | 'Processing' | 'Cancel'; // Union type
}
  