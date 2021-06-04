import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { INWORK_API } from '../app-injection-tokens';
import {Notification} from './interfaces/notification.interface'
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  quntNotReadedNotif: BehaviorSubject<number> = new BehaviorSubject(0);

  
  constructor(
    private http: HttpClient,
    @Inject(INWORK_API) private apiUrl:string,
    private socketService:SocketService
  ) {
    socketService.getnewNotificationObs().subscribe(res => this.quntNotReadedNotif.next(1+this.quntNotReadedNotif.getValue()))
   }

  getNotifications(): Observable<Array<Notification>>{
    return this.http.get<Array<Notification>>(`${this.apiUrl}/v1/api/notification/all`).pipe(tap((nots:Array<Notification>) => nots.forEach((not) => {if (not.date) not.date = new Date(not.date)})));
  }

  markAllAsReaded(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/v1/api/notification/all/mark-readed`);
  }

  getNotReaded(){
      this.http.get<number>(`${this.apiUrl}/v1/api/notification/quantity/not-readed`).subscribe((res:any) => {
        this.quntNotReadedNotif.next(res.quantity)
      });
  }
}
