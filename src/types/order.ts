export interface Order {
  _id: string;
  userId: string;
  itemId: string;
  quantity: number;
  price: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid';
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
  };
  createdAt: string;
}