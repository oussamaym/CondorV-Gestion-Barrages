import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeGrandeurDialogComponent } from './add-type-grandeur-dialog.component';

describe('AddTypeGrandeurDialogComponent', () => {
  let component: AddTypeGrandeurDialogComponent;
  let fixture: ComponentFixture<AddTypeGrandeurDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTypeGrandeurDialogComponent]
    });
    fixture = TestBed.createComponent(AddTypeGrandeurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
