export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'manager';
  avatar?: string;
  createdAt: string;
}