export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  lastPage: number;
}
