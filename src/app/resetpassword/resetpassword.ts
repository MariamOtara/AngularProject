import { Component, OnInit } from '@angular/core';
import { ApiAuth } from '../services/api-auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule, CommonModule],
  templateUrl: './resetpassword.html',
  styleUrl: './resetpassword.scss',
})
export class Resetpassword implements OnInit {

  token: string = '';
  newPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiAuth: ApiAuth,
    private router: Router
  ) {}

  ngOnInit() {
    
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token') || '';
      console.log('Токен, который видит Angular:', this.token);
    });
  }

  confirmReset() {
    if (!this.newPassword || this.newPassword.length < 6) {
      alert('Пароль слишком короткий');
      return;
    }

    const payload = {
      token: this.token,
      newPassword: this.newPassword
    };

    this.apiAuth.resetpassword(payload).subscribe({
      next: () => {
        alert('Пароль успешно изменен! Теперь войдите с новым паролем.');
        this.router.navigate(['/login']);
      },
      error: (err:any) => {
        alert('Ошибка: ' + (err.error?.detail || 'Токен недействителен'));
      }
    });
  }
}





