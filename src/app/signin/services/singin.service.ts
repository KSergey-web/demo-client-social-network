import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '../interfaces/login.interface';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'src/app/app-injection-tokens';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { tap} from 'rxjs/operators'
import { RegisterDTO } from 'src/app/sign-up/dto/register';
import { CURRENT_USER_ID } from 'src/app/services/user.service';
import { User } from 'src/app/services/interfaces/user.interface';

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
        localStorage.setItem(CURRENT_USER_ID, obj.user._id);
        localStorage.setItem(ACCESS_TOKEN_KEY, obj.token);
        let token = localStorage.getItem(ACCESS_TOKEN_KEY);
        console.warn(token);
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
    this.router.navigate(['signin']);
  }

  getUser():Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/v1/api/user`);
  }
}
