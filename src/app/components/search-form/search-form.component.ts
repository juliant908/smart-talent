import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelCardComponent } from 'src/app/containers/hotel-card/hotel-card.component';
import { HotelAppService } from 'src/app/services/hotel-app.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchForm: FormGroup;
  todaysDate: string = '';
  search: boolean = false;
  @Output() searchRooms: EventEmitter<any> = new EventEmitter()
  constructor(private formBuilder: FormBuilder, 
    private hotelService: HotelAppService,
    private hotelCard: HotelCardComponent) {
    this.searchForm = this.formBuilder.group({
      calendarStart: ['', Validators.required],
      calendarEnd: ['', Validators.required],
      guests: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      destination: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]]
    });
  }

  ngOnInit(): void {
    this.getTodaysDate();
  }

  onSubmit(): void {
    this.hotelService.search = true;
    console.log(this.hotelCard.hotels)
    this.hotelCard.hotels = [];
    console.log(this.hotelCard.hotels)
    return console.log(this.hotelService.getFilteredHotels(this.searchForm.get('destination')?.value))
    this.hotelCard.hotels = this.hotelService.getFilteredHotels(this.searchForm.get('destination')?.value);
  }

  getTodaysDate(): string{
    const todaysDate = new Date();
    const year = todaysDate.getFullYear();
    const month = todaysDate.getMonth() + 1;
    const date = todaysDate.getDate();
    return this.todaysDate = `${year}-${month}-${date}`
  }

}
