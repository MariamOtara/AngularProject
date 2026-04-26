import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Api } from '../services/api';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-details',
  imports: [RouterLinkWithHref],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit{
  selectedID: string = "";
  data: any; 


  constructor(private router :ActivatedRoute, private api: Api, private cdr : ChangeDetectorRef) {
    this.router.queryParams.subscribe(data => {
      this.selectedID = data['id'];
    });
  }
    
  ngOnInit(): void {
    console.log(this.selectedID);     
      this.api.getDatafromApi(`api/products/${this.selectedID}`).subscribe({
        next: (response: any) => {
          console.log(response.data);      
         this.data = response.data;
          this.cdr.detectChanges();
        },
        error: (err): void => {
          alert('Failed to load details');
        }
      });
    };
  }
  
