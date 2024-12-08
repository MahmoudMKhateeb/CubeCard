import { Component } from '@angular/core';
import { FooterLinksComponent } from './components/footer-links/footer-links.component';
import { FooterContactComponent } from './components/footer-contact/footer-contact.component';
import { FooterSocialComponent } from './components/footer-social/footer-social.component';
import { FooterPaymentComponent } from './components/footer-payment/footer-payment.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [
    FooterLinksComponent,
    FooterContactComponent,
    FooterSocialComponent,
    FooterPaymentComponent
  ]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}