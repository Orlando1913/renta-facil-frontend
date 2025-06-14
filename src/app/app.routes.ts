import { Routes } from '@angular/router';
import { VehicleListComponent } from './pages/vehicle-list/vehicle-list';
import { BookingFormComponent } from './pages/booking-form/booking-form';

export const routes: Routes = [
  { path: '', component: VehicleListComponent },
  { path: 'book/:id', component: BookingFormComponent },
  {
  path: 'bookings',
  loadComponent: () => import('./pages/booking-list/booking-list').then(m => m.BookingListComponent)
},
];
