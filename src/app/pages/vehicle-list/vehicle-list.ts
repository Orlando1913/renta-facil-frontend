import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Vehicle, VehicleService } from '../../services/vehicle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './vehicle-list.html',
  styleUrls: ['./vehicle-list.scss']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicle: VehicleService, private router: Router) {}

  ngOnInit(): void {
    this.vehicle.getAvailableVehicles().subscribe(data => {
      this.vehicles = data;
    });
  }

  goToBooking(id: string) {
    this.router.navigate(['/book', id]);
  }
}