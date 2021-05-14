import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INWORK_API } from '../app-injection-tokens';
import { Group, GroupDTO } from './interfaces/group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {


  constructor(
    private http: HttpClient,
    @Inject(INWORK_API) private apiUrl:string,
  ) { 
    
  }

  createGroup(dto:GroupDTO): Observable<Group>{
    return this.http.post<Group>(`${this.apiUrl}/v1/api/group`,dto);
  }

  getGroups(organizationId:string): Observable<Array<Group>>{
    return this.http.get<Array<Group>>(`${this.apiUrl}/v1/api/group/all/organization/${organizationId}`);
  }
}
