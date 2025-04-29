import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService, Booking } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  bookingForm: FormGroup;
  bookings: Booking[] = [];
  selectedType = 'flight';
  editing = false;
  editingId: number | null = null;
  ticketPrice = '';
  hotelPrice = '';
  holidayPrice = '';
  selectedServices: string[] = [];

  countries: string[] = ['India', 'USA', 'UK', 'France', 'Japan'];
  availableStates: string[] = [];
  availableStations: string[] = [];
  availableHotels: string[] = [];
  holidayDestinations: string[] = [];

  statesData: Record<string, string[]> = {
    India: ['Hyderabad', 'Delhi', 'Mumbai', 'Bangalore', 'Goa'],
    USA: ['New York', 'Chicago', 'Los Angeles', 'San Francisco', 'Las Vegas'],
    UK: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Liverpool'],
    France: ['Paris', 'Nice', 'Lyon', 'Marseille', 'Bordeaux'],
    Japan: ['Tokyo', 'Osaka', 'Kyoto', 'Hiroshima', 'Sapporo']
  };

  stationData: Record<string, string[]> = {
    Hyderabad: ['Shamshabad Airport', 'Begumpet Airport'],
    Delhi: ['Indira Gandhi Intl', 'Safdarjung Airport'],
    Mumbai: ['Chhatrapati Shivaji Intl', 'Juhu Airport'],
    Bangalore: ['Kempegowda Intl', 'HAL Airport'],
    Goa: ['Dabolim Airport', 'Mopa Airport'],
    'New York': ['JFK', 'LaGuardia'],
    Chicago: ['O\'Hare Intl', 'Midway Intl'],
    'Los Angeles': ['LAX', 'Hollywood Burbank'],
    'San Francisco': ['SFO', 'Oakland Intl'],
    'Las Vegas': ['McCarran Intl'],
    London: ['Heathrow', 'Gatwick'],
    Manchester: ['Manchester Airport'],
    Birmingham: ['Birmingham Airport'],
    Edinburgh: ['Edinburgh Airport'],
    Liverpool: ['Liverpool Airport'],
    Paris: ['Charles de Gaulle', 'Orly'],
    Nice: ['Nice Côte d\'Azur'],
    Lyon: ['Lyon-Saint Exupéry'],
    Marseille: ['Marseille Provence'],
    Bordeaux: ['Bordeaux-Mérignac'],
    Tokyo: ['Haneda', 'Narita'],
    Osaka: ['Kansai', 'Itami'],
    Kyoto: ['Osaka International'],
    Hiroshima: ['Hiroshima Airport'],
    Sapporo: ['New Chitose']
  };

  hotelData: Record<string, {name: string, price: string}[]> = {
    Hyderabad: [
      {name: 'Taj Krishna', price: '₹8,000/night'},
      {name: 'ITC Kohenur', price: '₹10,000/night'},
      {name: 'Novotel', price: '₹6,000/night'},
      {name: 'Lemon Tree', price: '₹4,500/night'},
      {name: 'Radisson Blu', price: '₹7,500/night'}
    ],
    Delhi: [
      {name: 'The Leela Palace', price: '₹15,000/night'},
      {name: 'Taj Mahal Hotel', price: '₹12,000/night'},
      {name: 'The Imperial', price: '₹10,000/night'},
      {name: 'The Lalit', price: '₹8,000/night'},
      {name: 'Hyatt Regency', price: '₹9,500/night'}
    ],
    Mumbai: [
      {name: 'Taj Lands End', price: '₹14,000/night'},
      {name: 'The Oberoi', price: '₹16,000/night'},
      {name: 'Trident Nariman Point', price: '₹12,000/night'},
      {name: 'JW Marriott', price: '₹11,000/night'},
      {name: 'ITC Maratha', price: '₹10,500/night'}
    ],
    'New York': [
      {name: 'The Plaza', price: '$500/night'},
      {name: 'Waldorf Astoria', price: '$450/night'},
      {name: 'The Ritz-Carlton', price: '$600/night'},
      {name: 'Four Seasons', price: '$550/night'},
      {name: 'The Peninsula', price: '$480/night'}
    ],
    London: [
      {name: 'The Savoy', price: '£400/night'},
      {name: 'Claridge\'s', price: '£450/night'},
      {name: 'The Ritz', price: '£500/night'},
      {name: 'The Connaught', price: '£480/night'},
      {name: 'The Langham', price: '£420/night'}
    ],
    Paris: [
      {name: 'The Ritz Paris', price: '€600/night'},
      {name: 'Four Seasons George V', price: '€700/night'},
      {name: 'Le Meurice', price: '€550/night'},
      {name: 'Shangri-La Hotel', price: '€650/night'},
      {name: 'Hôtel de Crillon', price: '€580/night'}
    ],
    Tokyo: [
      {name: 'The Ritz-Carlton', price: '¥80,000/night'},
      {name: 'Park Hotel Tokyo', price: '¥60,000/night'},
      {name: 'Mandarin Oriental', price: '¥75,000/night'},
      {name: 'Conrad Tokyo', price: '¥65,000/night'},
      {name: 'The Peninsula', price: '¥70,000/night'}
    ]
  };

  holidayData: Record<string, {destination: string, price: string}[]> = {
    India: [
      {destination: 'Goa Beach Resort', price: '₹25,000/person'},
      {destination: 'Kashmir Valley Tour', price: '₹35,000/person'},
      {destination: 'Kerala Backwaters', price: '₹28,000/person'},
      {destination: 'Rajasthan Heritage Tour', price: '₹30,000/person'},
      {destination: 'Andaman Islands', price: '₹40,000/person'}
    ],
    USA: [
      {destination: 'Hawaii Vacation', price: '$1,500/person'},
      {destination: 'Alaska Adventure', price: '$1,800/person'},
      {destination: 'Grand Canyon Tour', price: '$1,200/person'},
      {destination: 'New York City Experience', price: '$1,400/person'},
      {destination: 'California Coast', price: '$1,600/person'}
    ],
    UK: [
      {destination: 'Scottish Highlands', price: '£800/person'},
      {destination: 'London & Paris Combo', price: '£1,000/person'},
      {destination: 'Cotswolds Countryside', price: '£700/person'},
      {destination: 'Lake District', price: '£750/person'},
      {destination: 'Wales Explorer', price: '£650/person'}
    ],
    France: [
      {destination: 'French Riviera', price: '€1,200/person'},
      {destination: 'Paris & Normandy', price: '€1,000/person'},
      {destination: 'Provence Countryside', price: '€900/person'},
      {destination: 'French Alps Ski', price: '€1,500/person'},
      {destination: 'Loire Valley Castles', price: '€850/person'}
    ],
    Japan: [
      {destination: 'Golden Route Tour', price: '¥200,000/person'},
      {destination: 'Hokkaido Winter', price: '¥250,000/person'},
      {destination: 'Kyoto Cultural', price: '¥180,000/person'},
      {destination: 'Okinawa Beach', price: '¥220,000/person'},
      {destination: 'Shikoku Pilgrimage', price: '¥190,000/person'}
    ]
  };

  counts = {
    total: 0,
    confirmed: 0,
    waiting: 0,
    cancelled: 0
  };

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.bookingForm = this.fb.group({
      type: ['flight', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      dob: ['', Validators.required],
      status: ['confirmed', Validators.required],
      country: [''],
      state: [''],
      station: [''],
      flightClass: [''],
      hotel: [''],
      checkInDate: [''],
      checkOutDate: [''],
      holidayDestination: [''],
      holidayStartDate: [''],
      holidayEndDate: [''],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      dropoffDate: ['', Validators.required],
      dropoffTime: ['', Validators.required],
      services: [[]],
      price: [''],
      fatherName: ['']
    });
  }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.authService.getBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.countBookings();
      },
      error: (err) => console.error('Error loading bookings:', err)
    });
  }

  countBookings() {
    this.counts.total = this.bookings.length;
    this.counts.confirmed = this.bookings.filter(b => b.status === 'confirmed').length;
    this.counts.waiting = this.bookings.filter(b => b.status === 'waiting').length;
    this.counts.cancelled = this.bookings.filter(b => b.status === 'cancelled').length;
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.markFormGroupTouched(this.bookingForm);
      return;
    }

    const formValue = {
      ...this.bookingForm.value,
      price: this.getPriceBasedOnType(),
      services: this.selectedServices
    };

    if (this.editing && this.editingId !== null) {
      this.authService.updateBooking(this.editingId, formValue).subscribe({
        next: () => {
          this.resetForm();
          this.loadBookings();
        },
        error: (err) => console.error('Error updating booking:', err)
      });
    } else {
      this.authService.addBooking(formValue).subscribe({
        next: () => {
          this.resetForm();
          this.loadBookings();
        },
        error: (err) => console.error('Error adding booking:', err)
      });
    }
  }

  getPriceBasedOnType(): string {
    switch(this.selectedType) {
      case 'flight': return this.ticketPrice;
      case 'hotel': return this.hotelPrice;
      case 'holiday': return this.holidayPrice;
      default: return '';
    }
  }

  editBooking(booking: Booking) {
    this.editing = true;
    this.editingId = booking.id || null;
    this.selectedType = booking.type;
    this.selectedServices = booking.services || [];
    
    if (booking.type === 'flight') {
      this.ticketPrice = booking.price || '';
    } else if (booking.type === 'hotel') {
      this.hotelPrice = booking.price || '';
    } else if (booking.type === 'holiday') {
      this.holidayPrice = booking.price || '';
    }
    
    this.bookingForm.patchValue(booking);
    
    if (booking.country) {
      this.updateStates();
    }
    if (booking.state) {
      if (this.selectedType === 'hotel') {
        this.updateHotels();
      } else if (this.selectedType === 'flight') {
        this.updateStations();
      }
    }
    if (booking.country && this.selectedType === 'holiday') {
      this.updateHolidayDestinations();
    }
  }

  deleteBooking(index: number) {
    const bookingId = this.bookings[index].id;
    if (bookingId && confirm('Are you sure you want to delete this booking?')) {
      this.authService.deleteBooking(bookingId).subscribe({
        next: () => this.loadBookings(),
        error: (err) => console.error('Error deleting booking:', err)
      });
    }
  }

  resetForm() {
    this.bookingForm.reset({
      type: 'flight',
      status: 'confirmed'
    });
    this.selectedType = 'flight';
    this.ticketPrice = '';
    this.hotelPrice = '';
    this.holidayPrice = '';
    this.selectedServices = [];
    this.editing = false;
    this.editingId = null;
    this.availableStates = [];
    this.availableStations = [];
    this.availableHotels = [];
    this.holidayDestinations = [];
  }

  updateStates() {
    const selectedCountry = this.bookingForm.get('country')?.value;
    this.availableStates = this.statesData[selectedCountry] || [];
    this.bookingForm.get('state')?.reset();
    this.availableStations = [];
    this.availableHotels = [];
    
    if (this.selectedType === 'holiday') {
      this.updateHolidayDestinations();
    }
  }

  updateStations() {
    const selectedState = this.bookingForm.get('state')?.value;
    this.availableStations = this.stationData[selectedState] || [];
    this.bookingForm.get('station')?.reset();
  }

  updateHotels() {
    const selectedState = this.bookingForm.get('state')?.value;
    this.availableHotels = this.hotelData[selectedState]?.map(h => h.name) || [];
    this.bookingForm.get('hotel')?.reset();
    this.hotelPrice = '';
  }

  updateHolidayDestinations() {
    const selectedCountry = this.bookingForm.get('country')?.value;
    this.holidayDestinations = this.holidayData[selectedCountry]?.map(h => h.destination) || [];
    this.bookingForm.get('holidayDestination')?.reset();
    this.holidayPrice = '';
  }

  onTypeChange() {
    this.selectedType = this.bookingForm.get('type')?.value || 'flight';
    this.resetTypeSpecificFields();
    
    if (this.selectedType === 'holiday' && this.bookingForm.get('country')?.value) {
      this.updateHolidayDestinations();
    }
  }

  resetTypeSpecificFields() {
    this.ticketPrice = '';
    this.hotelPrice = '';
    this.holidayPrice = '';
    this.bookingForm.get('flightClass')?.reset();
    this.bookingForm.get('hotel')?.reset();
    this.bookingForm.get('holidayDestination')?.reset();
    this.availableStations = [];
    this.availableHotels = [];
    this.holidayDestinations = [];
  }

  toggleService(service: string) {
    const index = this.selectedServices.indexOf(service);
    if (index === -1) {
      this.selectedServices.push(service);
    } else {
      this.selectedServices.splice(index, 1);
    }
  }

  updatePrice() {
    const flightClass = this.bookingForm.get('flightClass')?.value;
    if (flightClass === 'economy') {
      this.ticketPrice = '₹10,000';
    } else if (flightClass === 'business') {
      this.ticketPrice = '₹20,000';
    } else if (flightClass === 'first') {
      this.ticketPrice = '₹50,000';
    } else {
      this.ticketPrice = '';
    }
    this.bookingForm.get('price')?.setValue(this.ticketPrice);
  }

  updateHotelPrice() {
    const selectedState = this.bookingForm.get('state')?.value;
    const selectedHotel = this.bookingForm.get('hotel')?.value;
    
    if (selectedState && selectedHotel) {
      const hotel = this.hotelData[selectedState]?.find(h => h.name === selectedHotel);
      this.hotelPrice = hotel?.price || '';
      this.bookingForm.get('price')?.setValue(this.hotelPrice);
    }
  }

  updateHolidayPrice() {
    const selectedCountry = this.bookingForm.get('country')?.value;
    const selectedDestination = this.bookingForm.get('holidayDestination')?.value;
    
    if (selectedCountry && selectedDestination) {
      const destination = this.holidayData[selectedCountry]?.find(h => h.destination === selectedDestination);
      this.holidayPrice = destination?.price || '';
      this.bookingForm.get('price')?.setValue(this.holidayPrice);
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // printPage() {
  //   console.log("Welcome")
  //   window.print();
  // }

  goToPayment(booking: any) {
    this.router.navigate(['/payment'], { state: { booking: booking } });
  }
  
}