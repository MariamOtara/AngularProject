import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';


@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  handleSubscribe(): void {
    
    console.log('Subscribe button clicked!');
  }
  protected readonly title = signal('AngularProject');
}
