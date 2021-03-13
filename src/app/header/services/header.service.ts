import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTH_API_URL, ORGANIZATION_KEY } from 'src/app/app-injection-tokens';
import { Organization } from 'src/app/services/interfaces/organization.interface';
import { SinginService } from 'src/app/signin/services/singin.service';
import { HeaderOrganization, HeaderUser} from '../interfaces/Header';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private http: HttpClient,
    @Inject(AUTH_API_URL) private apiUrl:string,
    private router: Router,
    private signInService: SinginService,
  ) { }

  getUser():Observable<HeaderUser>{
   return this.signInService.getUser().pipe(map(({name, surname}) => {
     return {name, surname}
    }));
  }

  getOrganization():Observable<HeaderOrganization>{
    let organizationid = localStorage.getItem(ORGANIZATION_KEY);
    return this.http.get<HeaderOrganization>(`${this.apiUrl}/v1/api/organization/${organizationid}`);
  }
}
