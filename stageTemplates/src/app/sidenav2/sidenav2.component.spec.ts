import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidenav2Component } from './sidenav2.component';

describe('Sidenav2Component', () => {
  let component: Sidenav2Component;
  let fixture: ComponentFixture<Sidenav2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Sidenav2Component]
    });
    fixture = TestBed.createComponent(Sidenav2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
