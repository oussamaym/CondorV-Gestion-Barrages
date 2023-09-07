import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParamGrandeurDialogComponent } from './edit-param-grandeur-dialog.component';

describe('EditParamGrandeurDialogComponent', () => {
  let component: EditParamGrandeurDialogComponent;
  let fixture: ComponentFixture<EditParamGrandeurDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditParamGrandeurDialogComponent]
    });
    fixture = TestBed.createComponent(EditParamGrandeurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
