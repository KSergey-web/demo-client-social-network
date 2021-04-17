import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { INWORK_API } from '../app-injection-tokens';
import { Task, TasKDTO, UpdateTaskDto } from './interfaces/task.interface';
import { User } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    @Inject(INWORK_API) private apiUrl:string,
  ) { }

  createTask(dto: TasKDTO):Observable<Task>{
    return this.http.post<Task>(`${this.apiUrl}/v1/api/task`,dto).pipe(tap((task:Task) => {if (task.deadline)task.deadline = new Date(task.deadline)}));
    }

    
  getTasks(teamId: string): Observable<Array<Task>>{
    return this.http.get<Array<Task>>(`${this.apiUrl}/v1/api/task/all/team/${teamId}`).pipe(tap((tasks:Array<Task>) => tasks.forEach((task) => {if (task.deadline) task.deadline = new Date(task.deadline)})));
  }

  getTask(taskId: string): Observable<Task>{
    return this.http.get<Task>(`${this.apiUrl}/v1/api/task/${taskId}`).pipe(tap((task:Task) => {if (task.deadline) task.deadline = new Date(task.deadline)}));
  }

  updateTask(taskId: string,dto: UpdateTaskDto): Observable<Task>{
    return this.http.patch<Task>(`${this.apiUrl}/v1/api/task/${taskId}`,dto).pipe(tap((task:Task) => {if (task.deadline) task.deadline = new Date(task.deadline)}));
  }

  addUsersToTask(taskId:string, users: Array<User>) : Observable<any>{
    let observable:Observable<any> = new Observable((observer:any) => {
      users.forEach(user => {
        this.http.patch<User>(`${this.apiUrl}/v1/api/task/addUser`,{task:taskId, user:user._id}).subscribe(val => {
          observer.next(val)
        },err => {alert(err), console.log(err)});
      })
    });
    return observable;
  }

  changeStatusForTask(taskId: string, statusId: string): Observable<Task>{
    return this.http.patch<Task>(`${this.apiUrl}/v1/api/task/status`,{task:taskId, status:statusId})
  }

  completeTask(taskId: string): Observable<Task>{
    return this.http.patch<Task>(`${this.apiUrl}/v1/api/task/status/complete`,{id:taskId})
  }

  getHistory(teamId: string): Observable<Array<Task>>{
    return this.http.get<Array<Task>>(`${this.apiUrl}/v1/api/task/history/team/${teamId}`)
  }
 }

