import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiAuth {
  private apiUrl = 'https://restaurantapi.stepacademy.ge/'
  constructor (private http: HttpClient){}
 
    login(credentials: { email: string; password: string }) {
    return this.http.post(this.apiUrl + 'api/auth/login', credentials);
  }

  register(userData: { email: string; password: string; firstName: string; lastName:string}) {
    return this.http.post(this.apiUrl + 'api/auth/register', userData);
  }
  

  
}
