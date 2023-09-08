import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRoleComponent } from './crud-role.component';

describe('CrudRoleComponent', () => {
  let component: CrudRoleComponent;
  let fixture: ComponentFixture<CrudRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudRoleComponent]
    });
    fixture = TestBed.createComponent(CrudRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
