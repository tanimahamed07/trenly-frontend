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
  };
}