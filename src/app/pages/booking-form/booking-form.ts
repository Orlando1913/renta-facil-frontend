import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService, CreateBookingDto } from '../../services/booking';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="outline">
        <mat-label>Nombre del cliente</mat-label>
        <input matInput formControlName="customerName" required>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Fecha inicio</mat-label>
        <input matInput [matDatepicker]="picker1" formControlName="startDate" [min]="minDate" required>
        <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
        <mat-datepicker #picker1></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Fecha fin</mat-label>
        <input matInput [matDatepicker]="picker2" formControlName="endDate" [min]="minDate" required>
        <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
        <mat-datepicker #picker2></mat-datepicker>
      </mat-form-field>

      <button mat-raised-button color="accent" type="submit" [disabled]="form.invalid">Reservar</button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 400px;
      margin: 2rem auto;
    }
  `]
})
export class BookingFormComponent {
  form!: FormGroup;
  vehicleId!: string;
  pricePerDay: number = 10; // Precio fijo por día
  minDate: Date = new Date(); // Para evitar fechas pasadas

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.vehicleId = this.route.snapshot.paramMap.get('id')!;

    this.form = this.fb.group({
      customerName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    const start = new Date(this.form.value.startDate);
    const end = new Date(this.form.value.endDate);
    const diffInMs = end.getTime() - start.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays <= 0) {
      alert('La fecha de fin debe ser posterior a la fecha de inicio.');
      return;
    }

    const totalPrice = Math.round(diffInDays * this.pricePerDay * 100) / 100;

    const dto: CreateBookingDto = {
      customerName: this.form.value.customerName,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      vehicleId: this.vehicleId,
      totalPrice
    };

    this.bookingService.createBooking(dto).subscribe({
      next: () => {
        alert('Reserva creada con éxito');
        this.router.navigate(['/bookings']);
      },
      error: err => {
  console.error('Error creando reserva', err);

  if (err.status === 400 || err.status === 500) {
    alert(err.error?.message || 'El vehículo ya está reservado en ese rango de fechas.');
  } else {
    alert('Ocurrió un error al crear la reserva. Intenta nuevamente.');
  }
}
    });
  }
}
