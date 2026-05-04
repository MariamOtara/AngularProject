import { Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})

export class Api {
private apiUrl = 'https://restaurantapi.stepacademy.ge/'

constructor(private http: HttpClient) {}

getDatafromApi( url: string ){
  return this.http.get(this.apiUrl + url);
}
}


