import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsClass, Categories } from '../models/product';
import { RouterLinkWithHref } from "@angular/router";


@Component({
  selector: 'app-menue',
  imports: [CommonModule, FormsModule, RouterLinkWithHref],
  templateUrl: './menue.html',
  styleUrl: './menue.scss',
})
export class MenueComponent implements OnInit {
  isFiltered: any;
  categoryId: number | null = null;
  constructor(private api: Api, private cdr : ChangeDetectorRef) {}
  data: { products: ProductsClass[] } = { products: [] };
  category: { category: any[] } = { category: Categories.list };
  page = 1;
  take = 12;
  hasMore = false;
  loading = false;

vegeterian: boolean = false;
spiciness: number = 0
rate = 0;
minPrice = 0;
maxPrice = 100

search = ""


   nextPage(): void {
    if (this.hasMore) {
    this.page++;
    this.loadProducts();
  }
  }
   
  prevPage(): void{
     if (this.page > 1){
    this.page--;
    this.loadProducts();
  }
  }
  ngOnInit(): void {
    this.loadProducts();
    this.loadCategory();
}
 onSearchChange(): void {
  this.page = 1;
  this.isFiltered = true;
  this.loadProducts();
}
  loadProducts(): void {
  this.loading = true;

  if (!this.isFiltered) {
    
    const url = `api/products?Take=${this.take}&Page=${this.page}`;
    this.fetchData(url);
  } else {
    
    let params = `Take=${this.take}&Page=${this.page}`;
    if (this.search) params += `&Search=${this.search}`;
    if (this.categoryId) params += `&CategoryId=${this.categoryId}`;
    if (this.vegeterian) params += `&Vegetarian=true`;
    if (this.spiciness > 0) params += `&Spiciness=${this.spiciness}`;
    if (this.rate > 0) params += `&Rate=${this.rate}`;
    
    params += `&MinPrice=${this.minPrice}&MaxPrice=${this.maxPrice}`;

    this.fetchData(`api/products/filter?${params}`);
  }
}


private fetchData(url: string): void {
  this.api.getDatafromApi(url).subscribe({
    next: (response: any) => {
      this.data.products = response.data.products;
     
      this.hasMore = response.data.hasMore; 
      this.cdr.detectChanges();
      this.loading = false;
    },
    error: () => {
      alert('Failed to load menu');
      this.loading = false;
    }
  });
}

filter(): void{
  if (this.minPrice > this.maxPrice) return;
  this.page = 1;
  this.isFiltered = true;
  this.loadProducts();
}

resetFilter(): void {
  this.isFiltered = false;
  this.page = 1;
  this.loadProducts();
  this.rate = 0;
  this.spiciness = 0;
  this.minPrice = 0;
  this.maxPrice = 100;
  this.vegeterian = false;
  this.categoryId = null;
  
  }

loadCategory():void {
  this.loading = true;
this.api.getDatafromApi(`api/categories`).subscribe({
    next: (response: any) => {
      console.log(response.data);
      this.category.category = response.data;
     console.log('Категории загружены:', this.category.category);
      this.cdr.detectChanges();
      this.loading = false;
},
    error: (_err): void => {
      alert('Failed to load menu');
      this.loading = false;
    }
  });  

}

onSelectCategory(id: number): void {
  
  this.categoryId = (this.categoryId === id) ? null : id;
   this.page = 1;
  this.isFiltered = true; 
  this.loadProducts();
}
allProducts: ProductsClass[] = []; 


}
