import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GpsService } from './gps-service.service';

describe('GpsServiceService', () => {
  let service: GpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
