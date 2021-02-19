import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  private coordsURI: string = 'https://api.3geonames.org/?randomland=yes';

  constructor(private http: HttpClient) {}

  private getCoords(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  makeCapitalMarkers(map: L.map): void {
    const lat = this.getCoords(90.0, -90.0);
    const lon = this.getCoords(90.0, -90.0);
    const marker = L.marker([lon, lat]).addTo(map);
  }
}
