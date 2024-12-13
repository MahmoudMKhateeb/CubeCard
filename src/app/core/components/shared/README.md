# Shared Module Structure

```
shared/
├── components/
│   ├── ui/
│   │   ├── button/
│   │   ├── input/
│   │   └── dialog/
│   ├── download/
│   │   ├── download-button/
│   │   ├── download-button-container/
│   │   └── download-app-dialog/
│   ├── error-message/
│   ├── loading-spinner/
│   └── skeletons/
│       ├── product-card-skeleton/
│       ├── product-details-skeleton/
│       └── category-card-skeleton/
├── config/
│   └── store-config.ts
├── constants/
│   └── image-paths.ts
├── models/
│   ├── product.interface.ts
│   ├── category.interface.ts
│   └── order.interface.ts
├── services/
│   ├── download.service.ts
│   └── platform.service.ts
└── utils/
    └── price.utils.ts
```