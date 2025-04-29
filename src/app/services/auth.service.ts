import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';


export interface Booking {
  id?: number;
  type: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  status: string;
  country: string;
  state: string;
  station: string;
  flightClass: string;
  hotel: string;
  checkInDate: string;
  checkOutDate: string;
  holidayDestination: string;
  holidayStartDate: string; // Updated type here
  holidayEndDate: string; // Updated type here
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  services: string[];
  price: string;
  fatherName: string;
}



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;
  private usersUrl = 'http://localhost:3000/users';
  private loginDataUrl = 'http://localhost:3000/loginData';
  private bookingUrl = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.get<any[]>(`${this.usersUrl}?email=${user.email}`).pipe(
      switchMap(existingUsers => {
        if (existingUsers.length > 0) throw new Error('User already registered');
        return this.http.post(this.usersUrl, user);
      }),
      catchError(() => throwError(() => new Error('Registration failed')))
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .get<any[]>(`${this.usersUrl}?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        map(users => {
          if (users.length === 0) throw new Error('Invalid credentials');
          return users[0];
        }),
        switchMap(user => {
          const loginRecord = { email: user.email, password: user.password };
          return this.http.post(this.loginDataUrl, loginRecord).pipe(map(() => user));
        }),
        catchError(() => throwError(() => new Error('Login failed')))
      );
  }

  updatePassword(email: string, newPassword: string): Observable<any> {
    return this.http.get<any[]>(`${this.usersUrl}?email=${email}`).pipe(
      switchMap(users => {
        if (users.length === 0) throw new Error('Email not found');
        const user = users[0];
        const updatedUser = { ...user, password: newPassword };
        return this.http.put(`${this.usersUrl}/${user.id}`, updatedUser);
      }),
      catchError(() => throwError(() => new Error('Password update failed')))
    );
  }

  // getBookings(): Observable<Booking[]> {
  //   return this.http.get<Booking[]>(this.bookingUrl);
  // }

  // addBooking(booking: Booking): Observable<Booking> {
  //   return this.http.post<Booking>(this.bookingUrl, booking);
  // }

  // updateBooking(id: number, booking: Booking): Observable<Booking> {
  //   return this.http.put<Booking>(`${this.bookingUrl}/${id}`, booking);
  // }

  // deleteBooking(id: number): Observable<any> {
  //   return this.http.delete(`${this.bookingUrl}/${id}`);
  // }


  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingUrl);
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingUrl, booking);
  }

  updateBooking(id: number, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.bookingUrl}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.bookingUrl}/${id}`);
  }
}
