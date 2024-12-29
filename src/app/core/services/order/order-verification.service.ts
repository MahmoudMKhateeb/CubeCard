import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConstants } from '../../constants/app.constants';
import { UserProfileService } from '../user-profile.service';

@Injectable() // Remove providedIn: 'root' since we're providing at component level
export class OrderVerificationService {
  // Service code remains the same
}