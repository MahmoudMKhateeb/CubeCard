import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConstants} from "../../../app.constants";

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
    private apiUrl = AppConstants.apiUrl; // Replace with your backend URL

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl+"categories");
    }
}
