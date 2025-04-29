import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  bookingData: any;
  selectedMethod: string = 'card';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.bookingData = navigation?.extras?.state?.['booking'];
  }

  printPage() {
    window.print();
  }
}
