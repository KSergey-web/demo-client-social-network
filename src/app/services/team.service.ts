import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INWORK_API } from '../app-injection-tokens';
import { OrganizationUserLink } from './interfaces/organization.interface';
import { CreateTeamDTO, Team } from './interfaces/team.interface';

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
    return this.http.post<Team>(`${this.apiUrl}/v1/api/team`,dto);
  }

  getTeams(organizationId: string): Observable<Array<Team>>{
    return this.http.get<Array<Team>>(`${this.apiUrl}/v1/api/team/all/organization/${organizationId}`);
  }
}
