export interface TReview {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  userId: {
    _id: string;
    name: string;
    avatar?: string;
    email: string;
  } | string;
  itemId: {
    _id: string;
    title: string;
    image: string;
    price: number;
    category: string;
  };
}