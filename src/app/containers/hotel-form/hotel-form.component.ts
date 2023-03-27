import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HotelAppService } from 'src/app/services/hotel-app.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss']
})
export class HotelFormComponent implements OnInit {

  hotelForm: FormGroup;
  roomsSaved: any;
  constructor(private formBuilder: FormBuilder,
    private hotelsService: HotelAppService) {
    this.hotelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      showHotel: ['', [Validators.required]],
      stars: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      image: ['', [Validators.required]],
      rooms: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.addControl();
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

  async onSubmit(): Promise<any> {
    await this.hotelsService.addHotelandRooms(this.hotelForm?.value)
      .then((res: any) => {
        location.reload()
      })
      .catch((err: any) => {
        alert('Ha ocurrido un error, intente más tarde')
      })
  }

  get rooms(): any {
    return this.hotelForm?.controls['rooms'] as FormArray;
  }
}

