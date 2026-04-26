import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiAuth } from '../services/api-auth';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkWithHref, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLinkWithHref, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers:[Auth]
})
export class Login {
  userId!: number;
  email: string = '';
  password: string = '';
  ProfileData: any;

  
  constructor(
    private api: ApiAuth,
    private router: Router,
    private auth: Auth
  ) {}

  
  login(forms: any){
    if (!this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    this.api.login({ email: this.email, password: this.password }).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.data.token);
        this.router.navigateByUrl('/profile');
        this.userId = response.data.id
      },
      error: (err): void => {
        alert('Login failed');
      }
    });
  }
}