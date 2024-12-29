import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../constants/app.constants';
import { OtpVerificationResponse } from '../../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class OtpApiService {
  private readonly apiUrl = AppConstants.apiUrl;

  constructor(private http: HttpClient) {}

  sendOtp(): Observable<OtpVerificationResponse> {
    return this.http.post<OtpVerificationResponse>(`${this.apiUrl}otp/send`, {});
  }

  verifyOtp(otp: string, mobile_number: string): Observable<OtpVerificationResponse> {
    return this.http.post<OtpVerificationResponse>(`${this.apiUrl}otp/verify`, {
      otp,
      mobile_number
    });
  }
}