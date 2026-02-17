import { User } from './user.model';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  createdBy: string | User; // Puede ser el ID o el objeto User populado
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  lastPage: number;
}
