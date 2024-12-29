import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductListItem} from "../../../models/product.types";
import {ProductMainService} from "../../products/services/product.service";
import {Subject, takeUntil} from "rxjs";
import {CommonModule} from "@angular/common";
import {ProductGridComponent} from "../../products/components/product-grid/product-grid.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    standalone: true,
    imports: [CommonModule, ProductGridComponent]
})
export class HomePage implements OnInit, OnDestroy {
    products: ProductListItem[] = [];
    loading = false;
    loadingMore = false;
    error?: string;
    currentPage = 1;
    totalPages = 1;
    private destroy$ = new Subject<void>();

    constructor(private productService: ProductMainService) {
    }

    ngOnInit() {
        this.loadProducts();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadProducts() {
        if (this.loading) return;

        this.loading = true;
        this.error = undefined;

        this.productService.getProducts().pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (response) => {
                console.log('Product response:', response);
                if (response.status && response.data?.products) {
                    this.products = response.data.products;
                    this.currentPage = response.data.pagination.current_page;
                    this.totalPages = response.data.pagination.total_pages;
                    console.log('Products loaded:', this.products);
                } else {
                    this.error = 'لم يتم العثور على منتجات';
                    console.error('Invalid response format:', response);
                }
                this.loading = false;
            },
            error: (err) => {
                this.error = 'حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى.';
                console.error('Error loading products:', err);
                this.loading = false;
            }
        });
    }

    onLoadMore() {
        if (this.loadingMore || this.currentPage >= this.totalPages) return;

        this.loadingMore = true;

        this.productService.getProducts(this.currentPage + 1).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (response) => {
                if (response.status && response.data?.products) {
                    this.products = [...this.products, ...response.data.products];
                    this.currentPage = response.data.pagination.current_page;
                    this.totalPages = response.data.pagination.total_pages;
                }
                this.loadingMore = false;
            },
            error: (err) => {
                console.error('Error loading more products:', err);
                this.loadingMore = false;
            }
        });
    }
}