import { Product } from '../models/product.model';

export type CreateProductDto = Omit<Product, '_id' | 'createdAt' | 'updatedAt'>;
