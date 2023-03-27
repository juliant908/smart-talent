import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HotelAppService } from './hotel-app.service';

describe('HotelAppService', () => {
  let service: HotelAppService;
  imports: [HttpClientTestingModule]
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
