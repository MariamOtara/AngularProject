import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiAuth {
  forgotPassword(emailValue: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://restaurantapi.stepacademy.ge/'
  constructor (private http: HttpClient){} 

    login(credentials: { email: string; password: string }) {
  return this.http.post(`${this.apiUrl}api/auth/login`, credentials, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
}
  
  register(userData: { email: string; password: string; firstName: string; lastName:string}) {
    return this.http.post(`${this.apiUrl}api/auth/register`, userData);
 
}  

  resendEmailVerification(email: string){
    return this.http.post(`${this.apiUrl}api/auth/resend-email-verification/${(email)}`, {});
  }  

  emailVerification(data: { email: string, token: string }) {
    const body = {
    email: data.email,
    code: data.token
    };
    return this.http.put(`${this.apiUrl}api/auth/verify-email`, body);
}

  getDatafromApiProfile() {
  const token = localStorage.getItem('token');
  
  return this.http.get(`${this.apiUrl}api/users/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
}

refreshAccessToken(token: string) {
   return this.http.post(`${this.apiUrl}api/auth/refresh-access-token/${token}`, {});
}

forgotpassword(email: string){
return this.http.post(`${this.apiUrl}api/auth/forgot-password/${email}`, {});
}

resetpassword(data: {token: string, newPassword: string}){
  return this.http.put(`${this.apiUrl}api/auth/reset-password`, data)
}
}
