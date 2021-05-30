import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INWORK_API } from '../app-injection-tokens';
import {HireUserByLoginDTO, Organization, OrganizationUserLink} from './interfaces/organization.interface'
import { userStatusEnum } from './interfaces/user.interface';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  public currentOrganization: BehaviorSubject<Organization> = new BehaviorSubject({name:"",description:'',avatar:'',_id:''})

  constructor(
    private http: HttpClient,
    @Inject(INWORK_API) private apiUrl:string,
  ) { }

  getOrganizationsOfUser(userId:string): Observable<Array<OrganizationUserLink>>{
    return this.http.get<Array<OrganizationUserLink>>(`${this.apiUrl}/v1/api/organization/all/${userId}`);
  }

  createOrganization(organization: any): Observable<Organization>{
    return this.http.post<Organization>(`${this.apiUrl}/v1/api/organization/`, serialize(organization));
  }

  getUsersFromOrganization(): Observable<Array<OrganizationUserLink>>{
    const organizationId = this.currentOrganization.getValue()._id;
    return this.http.get<Array<OrganizationUserLink>>(`${this.apiUrl}/v1/api/organization/${organizationId}/users`);
  }

  hireWorker(dto:HireUserByLoginDTO): Observable<any>{
    return this.http.post<Array<any>>(`${this.apiUrl}/v1/api/organization/hirewithlogin`, dto);
  }

  setNewPosition(userId: string, position: string):Observable<any>{
    const organizationId = this.currentOrganization.getValue()._id;
    return this.http.patch<any>(`${this.apiUrl}/v1/api/organization/${organizationId}/position`, {userId, position});
  }
}
