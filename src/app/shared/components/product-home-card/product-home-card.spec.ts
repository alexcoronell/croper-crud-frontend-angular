import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHomeCard } from './product-home-card';

describe('ProductHomeCard', () => {
  let component: ProductHomeCard;
  let fixture: ComponentFixture<ProductHomeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHomeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHomeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
