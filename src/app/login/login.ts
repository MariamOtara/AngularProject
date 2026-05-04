import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiAuth } from '../services/api-auth';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkWithHref, RouterModule, ActivatedRoute } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLinkWithHref, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers:[Auth]
})
export class Login implements OnInit{
  userId!: number;
  email: string = '';
  password: string = '';
  ProfileData: any;
 
  
  constructor(
    private apiAuth: ApiAuth,
    private router: Router,
    private auth: Auth,
    private route: ActivatedRoute
  ) {}
  
ngOnInit() {
  this.route.queryParamMap.subscribe(params => {
    const token = params.get('token');
    
  });
}


  login(forms: any){
    if (!this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }
    
 

  this.apiAuth.login({ email: this.email, password: this.password }).subscribe({
    next: (response: any) => {
      console.log('Login successful:', response);
      if (response.data && response.data.accessToken){
      localStorage.setItem('token', response.data.accessToken);
      console.log('Token saved:', response.data.accessToken);
      this.userId = response.data.id;      
      this.router.navigate(['/profile']);
      } 
    },
    error: (err) => {
    
      const errorMessage = err.error?.detail || err.detail || "";
      console.log('Detected Error Message:', errorMessage);
      if (errorMessage.includes("Please check your email for verification code")) {
       
        this.router.navigate(['/verifyemail'], { queryParams: { email: this.email } });
      } else {
        alert('Ошибка входа: ' + (errorMessage || 'Неверные данные'));
        console.error(err);
      }
    }
  });
}
forgotpassword() {
  if (!this.email) {
    alert('Введите Email');
    return;
  }

  this.apiAuth.forgotpassword(this.email).subscribe({
    next: () => {
     
      alert('Инструкции отправлены. Пожалуйста, следуйте ссылке в письме для установки нового пароля. После этого вернитесь сюда для входа.');
      this.router.navigate(['/resetpassword']);
    },
    error: (err) => alert('Ошибка отправки')
  });
}
}