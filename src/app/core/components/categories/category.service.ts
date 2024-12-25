import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from "../../../core/constants/app.constants";

export interface Category {
    id: number;
    name: string;
    icon: string;
    link: string;
}

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private apiUrl = AppConstants.apiUrl;

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}categories`);
    }
}