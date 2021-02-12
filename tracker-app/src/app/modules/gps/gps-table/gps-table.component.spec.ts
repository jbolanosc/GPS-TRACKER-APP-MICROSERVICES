import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsTableComponent } from './gps-table.component';

describe('GpsTableComponent', () => {
  let component: GpsTableComponent;
  let fixture: ComponentFixture<GpsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
