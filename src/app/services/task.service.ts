import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INWORK_API } from '../app-injection-tokens';
import { Task, TasKDTO } from './interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    @Inject(INWORK_API) private apiUrl:string,
  ) { }

  createTask(dto: TasKDTO):Observable<Task>{
    return this.http.post<Task>(`${this.apiUrl}/v1/api/task`,dto);
    }

    
  getTasks(teamId: string): Observable<Array<Task>>{
    return this.http.get<Array<Task>>(`${this.apiUrl}/v1/api/task/all/team/${teamId}`);
  }
 }

