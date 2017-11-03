import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselParkComponent } from './carousel-park.component';

describe('CarouselParkComponent', () => {
  let component: CarouselParkComponent;
  let fixture: ComponentFixture<CarouselParkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselParkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
