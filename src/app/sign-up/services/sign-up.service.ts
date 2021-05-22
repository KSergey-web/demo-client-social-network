import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AUTH_API_URL } from 'src/app/app-injection-tokens';
import { RegisterDTO } from '../dto/register';
import { serialize } from 'object-to-formdata';
//import * as fs from 'fs';
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
    console.warn(dto.file);
    return this.http.post(`${this.apiUrl}/v1/api/auth/register`, serialize(dto))
    .pipe(
      tap( (obj: any) => {
        console.log(obj);
      })
    );
  }

  testfile(selectedFile: File){
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this.http.post(`${this.apiUrl}/v1/api/upload`, fd)
    // .subscribe((res:any) => {
    //     console.log( res);
    //     // fs.writeFile(
    //     //   res.originalname,
    //     //   res,
    //     //   err => {console.log(err)},
    //     // );
    // });
  }
}
