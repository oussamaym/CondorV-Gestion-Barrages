import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSiteComponent } from './list-sites.component';

describe('ListBarrageComponent', () => {
  let component: ListBarrageComponent;
  let fixture: ComponentFixture<ListSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSiteComponent]
    });
    fixture = TestBed.createComponent(ListSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
