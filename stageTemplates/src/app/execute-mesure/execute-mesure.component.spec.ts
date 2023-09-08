import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteMesureComponent } from './execute-mesure.component';

describe('ExecuteMesureComponent', () => {
  let component: ExecuteMesureComponent;
  let fixture: ComponentFixture<ExecuteMesureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExecuteMesureComponent]
    });
    fixture = TestBed.createComponent(ExecuteMesureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
