import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
let token = localStorage.getItem('token')
  if (token) {
    return true;
  }

  return inject(Router).navigate(['/login']);
};
