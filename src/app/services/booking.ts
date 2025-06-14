import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateBookingDto {
  vehicleId: string;
  customerName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
}

export interface BookingDto {
  id: string;
  vehicleId: string;
  customerName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5027/api/booking';

  constructor(private http: HttpClient) {}

  createBooking(data: CreateBookingDto): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

getBookings(): Observable<BookingDto[]> {
  return this.http.get<BookingDto[]>(this.apiUrl);
}

  
}
