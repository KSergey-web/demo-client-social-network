import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INWORK_API } from '../app-injection-tokens';
import {OrganizationUserLink} from './interfaces/organization.interface'

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private http: HttpClient,
    @Inject(INWORK_API) private apiUrl:string,
  ) { }

  getOrganizationsOfUser(userId:string): Observable<Array<OrganizationUserLink>>{
    return this.http.get<Array<OrganizationUserLink>>(`${this.apiUrl}/v1/api/organization/all/${userId}`);
  }
}
