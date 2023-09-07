import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMesureGrandeurDialogComponent } from './add-mesure-grandeur-dialog.component';

describe('AddMesureGrandeurDialogComponent', () => {
  let component: AddMesureGrandeurDialogComponent;
  let fixture: ComponentFixture<AddMesureGrandeurDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMesureGrandeurDialogComponent]
    });
    fixture = TestBed.createComponent(AddMesureGrandeurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
