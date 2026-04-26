import { Component, ChangeDetectorRef } from '@angular/core';
import { Api } from '../services/api';
import { ProfileData } from '../models/product';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  data!: ProfileData;
  

  constructor(private api : Api, private cdr: ChangeDetectorRef){}

  ngOnInit(): void{
  this.api.getDatafromApi(`api/users/profile`).subscribe({
      next: (response: any) => {
      console.log(response.data);      
        this.cdr.detectChanges();
  },
    error: (err): void => {
      alert('Failed to load profile');
    }
  });  
}
}
