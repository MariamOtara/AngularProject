import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import{CartItem, CartClass} from '../models/product';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Api } from '../services/api';

@Component({
  selector: 'app-cart',
  imports: [RouterModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit{
cartData?: Cart; 
  constructor(
    private api: Api, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCart();
  }


   loadCart():void {
  
this.api.getDatafromApi(`api/cart`).subscribe({
    next: (response: any) => {
      console.log(response.data);
      this.cartData = response.data;
      console.log('Данные загружены:', this.cartData);
      this.cdr.detectChanges();
      
},
    error: (err): void => {
      alert('Failed to load cart');
   
    }
  });  
   }
}
