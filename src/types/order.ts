import { TProduct } from "./product.interface";

export type TOrderStatus = "pending" | "confirmed" | "delivered" | "cancelled";
export type TPaymentStatus = "unpaid" | "paid";

export interface TShippingAddress {
  fullName: string;
  phone: string;
  address: string;
}

export interface TOrder {
  _id: string;
  // userId সাধারণত পপুলেট হয়ে আসে (কন্ট্রোলার অনুযায়ী)
  userId: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  } | string; 
  
  // itemId ও পপুলেট হয়ে আসে (টাইটেল এবং ইমেজের জন্য)
  itemId: TProduct | string; 
  
  quantity: number;
  price: number;
  status: TOrderStatus;
  paymentStatus: TPaymentStatus;
  shippingAddress: TShippingAddress;
  
  // ট্র্যাকিং এবং টাইমস্ট্যাম্প
  trackingNumber?: string;
  deliveredAt?: string | Date;
  cancelledAt?: string | Date;
  paidAt?: string | Date;
  createdAt: string;
  updatedAt: string;
}

export interface TMeta {
  page: number;
  limit: number;
  total: number;
}

export interface TOrderResponse {
  success: boolean;
  message: string;
  data: TOrder[];
  meta: TMeta;
}