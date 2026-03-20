export interface TProduct {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  rating: number;
  ratingCount: number;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  data: TProduct[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}