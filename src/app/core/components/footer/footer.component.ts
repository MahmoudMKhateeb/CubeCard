import { Component } from '@angular/core';
import { FooterLinksComponent } from './components/footer-links/footer-links.component';
import { FooterContactComponent } from './components/footer-contact/footer-contact.component';
import { FooterPaymentComponent } from './components/footer-payment/footer-payment.component';
import { DownloadAppsComponent } from './components/download-apps/download-apps.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [
    FooterLinksComponent,
    FooterContactComponent,
    FooterPaymentComponent,
    DownloadAppsComponent
  ]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}