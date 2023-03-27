import { Component, Input, OnInit, Output } from '@angular/core';
import { HotelAppService } from 'src/app/services/hotel-app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit{
  query: any;
  hotels: any;
  constructor(public hotelsService: HotelAppService,
    public router: Router){

  }

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels(): any{
    this.hotelsService.getHotels()
      .then((res: any) => {
        this.hotels = res;
      })
      .catch((error: any) => {
        alert(error)
      })
  }

}
