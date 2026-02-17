import { Product } from '../models/product.model';

export type CreateProductDto = Omit<Product, 'id' | 'createdAt'>;
