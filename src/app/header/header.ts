import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(private auth : Auth, private router : Router ){
   this.islogedIn = this.auth.isAuth
  }

  islogedIn : any

  func(){
    if(this.islogedIn){
    this.auth.signIn()
    this.router.navigateByUrl('/login')
    }
    else{
    this.router.navigateByUrl('/login')
    }
  }
}
