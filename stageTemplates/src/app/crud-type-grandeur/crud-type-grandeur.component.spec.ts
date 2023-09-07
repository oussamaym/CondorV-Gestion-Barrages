import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTypeGrandeurComponent } from './crud-type-grandeur.component';

describe('CrudTypeGrandeurComponent', () => {
  let component: CrudTypeGrandeurComponent;
  let fixture: ComponentFixture<CrudTypeGrandeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudTypeGrandeurComponent]
    });
    fixture = TestBed.createComponent(CrudTypeGrandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
