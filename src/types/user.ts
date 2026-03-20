export interface TUser {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface TRegisterData extends Omit<TUser, '_id' | 'createdAt'> {
  password: string;
}

export type TLoginData = Pick<TRegisterData, 'email' | 'password'>;