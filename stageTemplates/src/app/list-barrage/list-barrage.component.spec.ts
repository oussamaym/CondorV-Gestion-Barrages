import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBarrageComponent } from './list-barrage.component';

describe('ListBarrageComponent', () => {
  let component: ListBarrageComponent;
  let fixture: ComponentFixture<ListBarrageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBarrageComponent]
    });
    fixture = TestBed.createComponent(ListBarrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
