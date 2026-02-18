import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHomeList } from './product-home-list';

describe('ProductHomeList', () => {
  let component: ProductHomeList;
  let fixture: ComponentFixture<ProductHomeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHomeList],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHomeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
