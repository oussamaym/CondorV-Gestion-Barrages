import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAgenceComponent } from './list-agence.component';

describe('ListAgenceComponent', () => {
  let component: ListAgenceComponent;
  let fixture: ComponentFixture<ListAgenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAgenceComponent]
    });
    fixture = TestBed.createComponent(ListAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
