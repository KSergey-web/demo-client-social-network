import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { INWORK_API } from '../app-injection-tokens';
import { OrganizationUserLink } from './interfaces/organization.interface';
import { AddStatusDTO, CreateTeamDTO, Status, Team, TeamUserLink } from './interfaces/team.interface';
import { User } from './interfaces/user.interface';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: HttpClient,
    @Inject(INWORK_API) private apiUrl:string,
  ) { }

  createTeam(dto:CreateTeamDTO, users: Array<OrganizationUserLink>) : Observable<Team>{
    if (users.length != 0){
      dto.users = [];
      users.forEach((link) => {
        dto.users?.push(link.user._id);
      }
      )
    }
    console.log(dto);
    return this.http.post<Team>(`${this.apiUrl}/v1/api/team`,serialize(dto));
  }

  getTeams(organizationId: string): Observable<Array<Team>>{
    return this.http.get<Array<Team>>(`${this.apiUrl}/v1/api/team/all/organization/${organizationId}`);
  }

   getStatuses(teamId: string): Observable<Array<Status>>{
    return this.http.get<Array<Status>>(`${this.apiUrl}/v1/api/team/${teamId}/statuses`);
  }

  getUsers(teamId: string): Observable<Array<User>>{
    return this.http.get<Array<User>>(`${this.apiUrl}/v1/api/team/${teamId}/users`);
  }

  getTeamUserLinks(teamId: string): Observable<Array<TeamUserLink>>{
    return this.http.get<Array<TeamUserLink>>(`${this.apiUrl}/v1/api/team/${teamId}/links`);
  }

  deleteStatus(statusId: string,teamId: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/v1/api/team/${teamId}/status/${statusId}`);
  }

  addStatus(dto: AddStatusDTO): Observable<Status>{
    return this.http.post<Status>(`${this.apiUrl}/v1/api/team/addstatus`,dto);
  }


  addUsersToTeam(teamId:string, links: Array<OrganizationUserLink>) : Observable<User>{
    let userObservable:Observable<User> = new Observable((observer:any) => {
      links.forEach(link => {
        this.http.post<User>(`${this.apiUrl}/v1/api/team/addUser`,{team:teamId, user:link.user._id}).subscribe(val => {
          observer.next(val)
        },err => {alert(err), console.log(err)});
      })
    });
    return userObservable;
  }
}
