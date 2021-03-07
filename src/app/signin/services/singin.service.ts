import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class SinginService {
  
  constructor(private http: HttpClient) { 
  }

  signIn(dto: LoginDTO){
    this.http.post('http://localhost:4000/auth/login', dto).subscribe((data:any) => {
      console.log(data);
  });
  }
}
