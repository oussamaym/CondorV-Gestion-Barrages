import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSiteDialogComponent } from './edit-site-dialog.component';

describe('EditSiteDialogComponent', () => {
  let component: EditSiteDialogComponent;
  let fixture: ComponentFixture<EditSiteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSiteDialogComponent]
    });
    fixture = TestBed.createComponent(EditSiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
