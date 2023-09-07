import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropGrandeurDialogComponent } from './add-prop-grandeur-dialog.component';

describe('AddPropGrandeurDialogComponent', () => {
  let component: AddPropGrandeurDialogComponent;
  let fixture: ComponentFixture<AddPropGrandeurDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPropGrandeurDialogComponent]
    });
    fixture = TestBed.createComponent(AddPropGrandeurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
