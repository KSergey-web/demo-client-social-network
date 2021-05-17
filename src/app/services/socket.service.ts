import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import * as io from 'socket.io-client';
import { ACCESS_TOKEN_KEY } from '../signin/services/singin.service';
import { MessageDTO, MessageEntity } from './interfaces/message.interface';
import { Task } from './interfaces/task.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor(
    private router:Router,
    private userService: UserService
  ) { 
    
    this.socket=io('http://localhost:4000/');
    if (!localStorage.getItem(ACCESS_TOKEN_KEY)) this.socket.disconnect();
    this.msgFromChatEvent();
    this.taskChanged();
    this.taskCreated();
    this.newNotificationEvent();
    this.connectedEvent();
  }

  authEvent(){
    this.socket.on('errorAuth', (err : any) => {
      alert(`errorAuth ${err.message}`);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      this.router.navigate(['signin']);
    });
    this.socket.emit('auth', { token: localStorage.getItem(ACCESS_TOKEN_KEY)});
  }

  msgToChatEvent(dto: MessageDTO){
    this.socket.emit('msgToChat', dto);
  }

  msgObservable!:Observable<MessageEntity>;
  private msgFromChatEvent():void {
    this.msgObservable =  new Observable((observer:any) => {
      this.socket.on('msgFromChat',(msg :MessageEntity) => {
        observer.next(msg);
      });
    });
  }
  
  taskChangedObs!: Observable<Task>
  private taskChanged():void{
    this.taskChangedObs = new Observable((observer: Observer<Task>) => {
      this.socket.on('changedTask', (task: Task)=> {
        observer.next(task);
      })
    })
  }

  taskCreatedObs!: Observable<Task>
  private taskCreated():void{
    this.taskCreatedObs = new Observable((observer: Observer<Task>) => {
      this.socket.on('createdTask', (task: Task)=> {
        observer.next(task);
      })
    })
  }

  newNotificationObs!: Observable<Task>
  private newNotificationEvent():void{
    this.newNotificationObs = new Observable((observer: Observer<Task>) => {
      this.socket.on('newNotification', (res:any)=> {
        observer.next(res);
      })
    })
  }

  getnewNotificationObs(): Observable<Task>{
    return this.newNotificationObs;
  }

  getTaskCreatedStatusObs(): Observable<Task>{
    return this.taskCreatedObs;
  }

  enterToTeamEvent(teamId:string){
    this.socket.emit('enterTeam',{id:teamId})
  }

  leaveTeamEvent(teamId:string){
    this.socket.emit('leaveTeam',{id:teamId})
  }

  getTaskChangeStatusObs(): Observable<Task>{
    return this.taskChangedObs;
  }

  getObsmsg():Observable<MessageEntity>{
    return this.msgObservable;
  }

  private connectedEvent():void {
      this.socket.on('connectedEvent',() => {
        this.authEvent();
      });
  }

  disconnect():void{
    this.socket.disconnect();
  }

  connect():void{
    this.socket.connect();
  }
}