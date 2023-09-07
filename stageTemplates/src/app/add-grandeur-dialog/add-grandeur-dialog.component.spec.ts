import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrandeurDialogComponent } from './add-grandeur-dialog.component';

describe('AddGrandeurDialogComponent', () => {
  let component: AddGrandeurDialogComponent;
  let fixture: ComponentFixture<AddGrandeurDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGrandeurDialogComponent]
    });
    fixture = TestBed.createComponent(AddGrandeurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
