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
    this.msgFromChatEvent();
    this.taskChanged();
    this.connectedEvent();
  }

  authEvent(){
    this.socket.on('errorAuth', (err : any) => {
      alert(err.message);
      this.router.navigate(['auth']);
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
        console.warn(task);
        observer.next(task);
      })
    })
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