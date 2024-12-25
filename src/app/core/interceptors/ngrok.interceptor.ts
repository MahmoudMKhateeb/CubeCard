import { HttpInterceptorFn } from '@angular/common/http';

export const ngrokInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    setHeaders: {
      'ngrok-skip-browser-warning': 'true'
    }
  });
  return next(req);
};