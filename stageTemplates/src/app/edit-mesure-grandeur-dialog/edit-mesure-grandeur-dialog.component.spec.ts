import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMesureGrandeurDialogComponent } from './edit-mesure-grandeur-dialog.component';

describe('EditMesureGrandeurDialogComponent', () => {
  let component: EditMesureGrandeurDialogComponent;
  let fixture: ComponentFixture<EditMesureGrandeurDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMesureGrandeurDialogComponent]
    });
    fixture = TestBed.createComponent(EditMesureGrandeurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
