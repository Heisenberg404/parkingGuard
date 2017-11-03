import { Component, OnInit } from '@angular/core';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';

@Component({
  selector: 'app-carousel-park',
  templateUrl: './carousel-park.component.html',
  styleUrls: ['./carousel-park.component.css']
})
export class CarouselParkComponent implements OnInit {


  public imageSources: string[] = [
    '../../../assets/img/car1.jpg',
    '../../../assets/img/moto2.jpg',
    '../../../assets/img/car3.jpg',
    '../../../assets/img/moto1.jpg',
    '../../../assets/img/car2.jpg'
  ];

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: true,
    autoplayDelay: 2000,
    stopAutoplayMinWidth: 768
  };

  constructor() { }

  ngOnInit() {
  }

}
