import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AppConstants } from '../constants/app.constants';

export interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getCurrentUserProfile(): Observable<UserProfile> {
    return this.http.get<any>(`${AppConstants.apiUrl}user`).pipe(
      map(response => ({
        first_name: response.data?.first_name || '',
        last_name: response.data?.last_name || '',
        email: response.data?.email || '',
        mobile_number: response.data?.mobile_number || ''
      }))
    );
  }
}