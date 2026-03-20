 export interface TReview {
  _id: string;
  rating: number;
  comment: string;
  userId: { name: string; avatar?: string };
  itemId: string;
  createdAt: string;
}