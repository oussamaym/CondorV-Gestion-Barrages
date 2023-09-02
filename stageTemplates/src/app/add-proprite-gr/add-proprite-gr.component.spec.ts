import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropriteGrComponent } from './add-proprite-gr.component';

describe('AddPropriteGrComponent', () => {
  let component: AddPropriteGrComponent;
  let fixture: ComponentFixture<AddPropriteGrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPropriteGrComponent]
    });
    fixture = TestBed.createComponent(AddPropriteGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
