import { Component } from '@angular/core';

import {StoreConfig} from "../shared/config/store-config";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [
    RouterLink,
  ]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  storeConfig = StoreConfig;

}