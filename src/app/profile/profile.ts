import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProfileData } from '../models/product';
import { CommonModule } from '@angular/common';
import { ApiAuth } from '../services/api-auth';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  data!: ProfileData;
  

  constructor(private api : ApiAuth, private cdr: ChangeDetectorRef){}

  ngOnInit(): void{
  this.api.getDatafromApiProfile().subscribe({
      next: (response: any) => {
      console.log('Profile Response:', response.data);      
      this.data = response.data;
        this.cdr.detectChanges();
  },
    error: (err): void => {
        console.error('Profile error:', err);
        alert('Failed to load profile');
      }
    });
  }
}
