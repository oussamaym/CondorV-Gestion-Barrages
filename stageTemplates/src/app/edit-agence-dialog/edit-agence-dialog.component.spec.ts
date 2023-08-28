import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgenceDialogComponent } from './edit-agence-dialog.component';

describe('EditAgenceDialogComponent', () => {
  let component: EditAgenceDialogComponent;
  let fixture: ComponentFixture<EditAgenceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAgenceDialogComponent]
    });
    fixture = TestBed.createComponent(EditAgenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
