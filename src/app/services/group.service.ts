import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INWORK_API } from '../app-injection-tokens';
import { Group, GroupDTO, GroupUserLink } from './interfaces/group.interface';
import { OrganizationUserLink } from './interfaces/organization.interface';
import { User } from './interfaces/user.interface';
import { serialize } from 'object-to-formdata';

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
    return this.http.post<Group>(`${this.apiUrl}/v1/api/group`,serialize(dto));
  }

  getGroups(organizationId:string): Observable<Array<Group>>{
    return this.http.get<Array<Group>>(`${this.apiUrl}/v1/api/group/all/organization/${organizationId}`);
  }

  getUsers(groupId: string): Observable<Array<GroupUserLink>>{
    return this.http.get<Array<GroupUserLink>>(`${this.apiUrl}/v1/api/group/${groupId}/users`);
  }


  addUsersToGroup(groupId:string, links: Array<OrganizationUserLink>) : Observable<User>{
    let userObservable:Observable<User> = new Observable((observer:any) => {
      links.forEach(link => {
        this.http.post<User>(`${this.apiUrl}/v1/api/group/addUser`,{group:groupId, user:link.user._id}).subscribe(val => {
          observer.next(val)
        },err => {alert(err), console.log(err)});
      })
    });
    return userObservable;
  }
  
}
