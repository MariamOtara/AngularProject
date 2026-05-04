import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { ApiAuth } from './services/api-auth';


@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  private apiAuth = inject(ApiAuth);
  private router = inject(Router);
  protected readonly title = signal('AngularProject');
   
  ngOnInit(): void {
    this.checkAndRefreshSession();
  }
   checkAndRefreshSession() {
    const oldToken = localStorage.getItem('token');
    
    if (!oldToken) return;

    
    this.apiAuth.refreshAccessToken(oldToken).subscribe({
      next: (response: any) => {
        if (response.data?.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          console.log('Сессия автоматически продлена');
        }
      },
      error: (err: any) => {
        console.error('Сессия истекла:', err);
        localStorage.removeItem('token');       
        this.router.navigate(['/login']);
      }
    });
  }


  handleSubscribe(): void {
    
    console.log('Subscribe button clicked!');
  }
 
}
