import { Component, OnInit } from '@angular/core';
import { Router, Route, RouterLink } from '@angular/router';
import { HotelAppService } from 'src/app/services/hotel-app.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isAdmin: any;
  constructor(public router: Router, public hotelsService: HotelAppService){
  }

  ngOnInit(): void {
      this.getUserInfo();
  }

  navigate(route: any): void {
    this.router.navigate([route])
  }

  getUserInfo(): void {
    this.hotelsService.getUserInfo('user')?.subscribe((res: any) => {
      this.isAdmin = res?.isAdmin;
    }, (err: any) => {
      alert(err)
    })
  }
}
