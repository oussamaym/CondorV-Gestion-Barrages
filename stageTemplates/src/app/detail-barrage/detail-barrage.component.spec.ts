import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBarrageComponent } from './detail-barrage.component';

describe('DetailBarrageComponent', () => {
  let component: DetailBarrageComponent;
  let fixture: ComponentFixture<DetailBarrageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailBarrageComponent]
    });
    fixture = TestBed.createComponent(DetailBarrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
