import { HttpInterceptorFn } from '@angular/common/http';


export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
 const apiKey = '6cd5ee8c-6f3c-44e7-bfea-34ecbfc31260';

  if (req.url.startsWith('https://restaurantapi.stepacademy.ge')) {
    const modifiedReq = req.clone({
      setHeaders: {
        'X-API-KEY': apiKey
      }
    });
    return next(modifiedReq);
  }
  return next(req);
};
