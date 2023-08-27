import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleDialogComponent } from './add-role-dialog.component';

describe('AddRoleDialogComponent', () => {
  let component: AddRoleDialogComponent;
  let fixture: ComponentFixture<AddRoleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoleDialogComponent]
    });
    fixture = TestBed.createComponent(AddRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
