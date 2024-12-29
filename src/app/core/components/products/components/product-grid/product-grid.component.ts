import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ProductListItem} from "../../../../models/product.types";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ErrorMessageComponent} from "../../../shared/components/error-message/error-message.component";

@Component({
    selector: 'app-product-grid',
    templateUrl: './product-grid.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule, ErrorMessageComponent]
})
export class ProductGridComponent {
    @Input() products: ProductListItem[] = [];
    @Input() loading = false;
    @Input() error?: string;
    @Input() loadingMore = false;
    @Output() loadMore = new EventEmitter<void>();

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if (this.shouldLoadMore()) {
            this.onScroll();
        }
    }

    private shouldLoadMore(): boolean {
        if (this.loadingMore || this.loading) return false;

        const threshold = 100;
        const position = window.scrollY + window.innerHeight;
        const height = document.documentElement.scrollHeight;

        return position > height - threshold;
    }

    handleImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = 'assets/images/placeholder.png';
    }

    onScroll() {
        if (!this.loadingMore) {
            this.loadMore.emit();
        }
    }

    loadProducts() {
        this.loadMore.emit();
    }
}