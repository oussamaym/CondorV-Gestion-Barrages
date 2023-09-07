import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropGrandeurDialogComponent } from './edit-prop-grandeur-dialog.component';

describe('EditPropGrandeurDialogComponent', () => {
  let component: EditPropGrandeurDialogComponent;
  let fixture: ComponentFixture<EditPropGrandeurDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPropGrandeurDialogComponent]
    });
    fixture = TestBed.createComponent(EditPropGrandeurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
