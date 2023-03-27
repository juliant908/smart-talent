import { Component, OnInit } from '@angular/core';
import { HotelAppService } from 'src/app/services/hotel-app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  isAdmin: any;
  search: boolean = false
  constructor(public hotelsService: HotelAppService){

  }

  ngOnInit(): void {
      this.getUserInfo()
  }

  getUserInfo(): void {
    this.hotelsService.getUserInfo('user')?.subscribe((res: any) => {
      this.isAdmin = res?.isAdmin;
    }, (err: any) => {
      alert(err)
    })
  }

  searchFunction(): void {
    
  }
}
