import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vehicle {
licensePlate: any;
  id: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:5147/api/vehicles';

  constructor(private http: HttpClient) {}

  getAvailableVehicles(): Observable<Vehicle[]> {
    const startDate = new Date().toISOString();
    const endDate = new Date(Date.now() + 86400000).toISOString(); // mañana

    const url = `${this.apiUrl}/available?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<Vehicle[]>(url);
  }

  getVehicleById(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }
  
}
