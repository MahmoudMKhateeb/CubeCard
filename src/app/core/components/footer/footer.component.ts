import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreConfig } from "../shared/config/store-config";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  storeConfig = StoreConfig;
}