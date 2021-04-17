import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as io from 'socket.io-client';
import { ACCESS_TOKEN_KEY } from '../signin/services/singin.service';
import { MessageDTO, MessageEntity } from './interfaces/message.interface';
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