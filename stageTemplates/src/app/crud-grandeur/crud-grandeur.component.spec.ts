import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudGrandeurComponent } from './crud-grandeur.component';

describe('CrudGrandeurComponent', () => {
  let component: CrudGrandeurComponent;
  let fixture: ComponentFixture<CrudGrandeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudGrandeurComponent]
    });
    fixture = TestBed.createComponent(CrudGrandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
