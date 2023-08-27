import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAgenceComponent } from './crud-agence.component';

describe('CrudAgenceComponent', () => {
  let component: CrudAgenceComponent;
  let fixture: ComponentFixture<CrudAgenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudAgenceComponent]
    });
    fixture = TestBed.createComponent(CrudAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
