import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSiteComponent } from './crud-site.component';

describe('CrudSiteComponent', () => {
  let component: CrudSiteComponent;
  let fixture: ComponentFixture<CrudSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudSiteComponent]
    });
    fixture = TestBed.createComponent(CrudSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
