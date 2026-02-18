import { Component, ChangeDetectionStrategy, inject, signal, effect } from '@angular/core';
import { form, FormField, required, min, minLength, maxLength } from '@angular/forms/signals';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateProductDto } from '@app/domain/dtos/product-dto';
import { ProductStore } from '@core/store/product.store';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormField],
  templateUrl: './product-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly productStore = inject(ProductStore);
  errorMessage = signal<string | null>(null);
  isSuccess = signal<boolean>(false);

  productModel = signal<CreateProductDto>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
  });

  productForm = form(this.productModel, (schemaPath) => {
    required(schemaPath.name, { message: 'El nombre es requerido' });
    minLength(schemaPath.name, 3, { message: 'Mínimo 3 caracteres' });
    required(schemaPath.category, { message: 'La categoría es requerida' });
    required(schemaPath.price, { message: 'El precio es requerido' });
    min(schemaPath.price, 1, { message: 'El precio debe ser mayor a 0' });
    required(schemaPath.stock, { message: 'El stock es requerido' });
    min(schemaPath.stock, 0, { message: 'El stock no puede ser negativo' });
    required(schemaPath.description, { message: 'La descripción es requerida' });
    maxLength(schemaPath.description, 500, { message: 'Máximo 500 caracteres' });
  });

  constructor() {
    const id = this.route.snapshot.params['id'] ?? null;
    this.productStore.selectProduct(id);

    effect(() => {
      const currentId = this.productStore.currentProductId();
      if (!currentId) return;

      const product = this.productStore.products().find((p) => p._id === currentId);
      if (product) {
        this.productModel.set({ ...product });
      }
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.productForm().invalid()) return;

    this.productStore
      .saveProduct(this.productModel())
      .then(() => {
        this.isSuccess.set(true);
        setTimeout(() => this.goBack(), 2000);
      })
      .catch((error: unknown) => {
        this.errorMessage.set(error as string);
        this.isSuccess.set(false);
      });
  }

  goBack(): void {
    this.productStore.selectProduct(null);
    void this.router.navigate(['/admin/inventario']);
  }
}
