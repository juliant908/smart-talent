import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HotelAppService } from 'src/app/services/hotel-app.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent {

  hotels: any;
  isAdmin: any;
  hotelForm: FormGroup;
  reservationForm: FormGroup;
  roomsSaved: any;
  roomsAvailable: any;
  showReservation: boolean = false;
  constructor(private formBuilder: FormBuilder,
    public router: Router,
    public hotelsService: HotelAppService) {
    this.hotelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      showHotel: ['', [Validators.required]],
      stars: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      image: ['', [Validators.required]],
      rooms: this.formBuilder.array([])
    });
    this.reservationForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.addControl();
    this.getRooms();
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.hotelsService.getUserInfo('user')?.subscribe((res: any) => {
      this.isAdmin = res?.isAdmin;
    }, (err: any) => {
      alert(err)
    })
  }

  showReservationForm(): void {
    this.showReservation = !this.showReservation;
  }
  getRooms(): void {
      this.hotelsService.getRooms(location.pathname.slice(8,).replaceAll('%20',' '))
        .then((res: any) => {
          this.roomsAvailable = res;
        })
        .catch((error: any) => {
          alert(error)
        })
  }

  addControl(): void {
    const roomForm = this.formBuilder.group({
      roomName: new FormControl('', [Validators.required]),
      roomDescription: new FormControl('', [Validators.required]),
      roomPrice: new FormControl('', [Validators.required]),
      roomGuests: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
      roomType: new FormControl('', [Validators.required]),
      roomDateAvailableEnd: new FormControl('', [Validators.required]),
      roomDateAvailableStart: new FormControl('', [Validators.required]),
      roomImage: new FormControl('', [Validators.required]),
      roomShow: new FormControl('', [Validators.required]),
      roomLocation: new FormControl('', [Validators.required]),
      roomHotel: new FormControl('', [Validators.required])
    });
    this.rooms?.push(roomForm);
  }

  addRoom(): void {
    if (this.hotelForm?.valid) {
      this.addControl();
      this.roomsSaved = this.hotelForm.value?.rooms?.slice(0, -1);
    }
  }

  onSubmit(): any {
    return alert('Hotel editado con éxito')
  }

  get rooms(): any {
    return this.hotelForm?.controls['rooms'] as FormArray;
  }

  onMakeReservation(): void {
    this.hotelsService.sendEmail('')
    this.router.navigate(['/'])
  }
}
