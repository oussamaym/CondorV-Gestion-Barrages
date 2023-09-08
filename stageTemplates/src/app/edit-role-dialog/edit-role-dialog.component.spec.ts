import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoleDialogComponent } from './edit-role-dialog.component';

describe('EditRoleDialogComponent', () => {
  let component: EditRoleDialogComponent;
  let fixture: ComponentFixture<EditRoleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRoleDialogComponent]
    });
    fixture = TestBed.createComponent(EditRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
