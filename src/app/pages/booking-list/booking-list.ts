import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  templateUrl: './booking-list.html',
  styleUrls: ['./booking-list.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class BookingListComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe({
      next: (data) => (this.bookings = data),
      error: (err) => console.error('Error cargando reservas', err)
    });
  }
}
