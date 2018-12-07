import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPerCategoryComponent } from './item-per-category.component';

describe('ItemPerCategoryComponent', () => {
  let component: ItemPerCategoryComponent;
  let fixture: ComponentFixture<ItemPerCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPerCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
