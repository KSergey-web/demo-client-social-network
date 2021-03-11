import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AUTH_API_URL } from 'src/app/app-injection-tokens';
import { RegisterDTO } from '../dto/register';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private http: HttpClient,
    @Inject(AUTH_API_URL) private apiUrl:string,
    ) { 
  } 

  registr(dto: RegisterDTO): Observable<any>{
    return this.http.post(`${this.apiUrl}/v1/api/auth/register`, dto)
    .pipe(
      tap( (obj: any) => {
        console.log(obj);
      })
    );
  }
}
