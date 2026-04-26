import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

let router = inject(Router)

if(localStorage.getItem("accessToken")=== null){
  router.navigateByUrl('/login')
  alert("Please sign in")
  return false
}

  return true;
};
