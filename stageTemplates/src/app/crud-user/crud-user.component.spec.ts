import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUserComponent } from './crud-user.component';

describe('CrudUserComponent', () => {
  let component: CrudUserComponent;
  let fixture: ComponentFixture<CrudUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudUserComponent]
    });
    fixture = TestBed.createComponent(CrudUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
