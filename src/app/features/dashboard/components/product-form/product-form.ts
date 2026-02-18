import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { form, FormField, maxLength, min, minLength, required } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductStore } from '@core/store/product.store';
import { CreateProductDto } from '@dtos/product-dto';

/**
 * Component providing a form for creating and editing product information.
 * Manages product data, validation, and submission to the backend.
 */
@Component({
  selector: 'app-product-form',
  imports: [FormField],
  templateUrl: './product-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {
  /** Injected Router for navigation. */
  private readonly router = inject(Router);
  /** Injected ActivatedRoute for accessing route parameters. */
  private readonly route = inject(ActivatedRoute);
  /** Injected ProductStore for managing product state. */
  readonly productStore = inject(ProductStore);
  /** Signal holding error messages for the form. */
  errorMessage = signal<string | null>(null);
  /** Signal indicating the success state of form submission. */
  isSuccess = signal<boolean>(false);

  /** Model signal holding the current product form data as a DTO. */
  productModel = signal<CreateProductDto>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
  });

  /** Form state and validation rules using Angular Signal Forms. */
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

  /**
   * Handles form submission.
   * Validates the form and triggers product save via ProductStore.
   * @param event - The submission event.
   */
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

  /**
   * Clears product selection and navigates back to the inventory list.
   */
  goBack(): void {
    this.productStore.selectProduct(null);
    void this.router.navigate(['/admin/inventario']);
  }
}
