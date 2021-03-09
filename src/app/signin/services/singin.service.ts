import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '../interfaces/login.interface';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'src/app/app-injection-tokens';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { tap} from 'rxjs/operators'

export const ACCESS_TOKEN_KEY: string = "inwork_access_token";

@Injectable({
  providedIn: 'root'
})
export class SinginService {
  
  constructor(
    private http: HttpClient,
    @Inject(AUTH_API_URL) private apiUrl:string,
    private jwtHelper:JwtHelperService,
    private router: Router,
    ) { 
  } 

  login(dto: LoginDTO): Observable<any>{
    return this.http.post(`${this.apiUrl}/v1/api/auth/login`, dto)
    .pipe(
      tap( (obj: any) => {
        console.log(obj);
        localStorage.setItem(ACCESS_TOKEN_KEY, obj.token);
      })
    );
  }

  isAuthenticated(): boolean{
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return false; 
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut():void{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate([''])
  }

  user() {
    return this.http.get(`${this.apiUrl}/v1/api/user`).subscribe(res=>{console.log(res)});
  }
}
