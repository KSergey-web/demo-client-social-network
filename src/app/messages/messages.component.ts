import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chat } from '../services/interfaces/chat.interface';
import { MessageEntity } from '../services/interfaces/message.interface';
import { MessageService } from '../services/message.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {


  msgForm = this.fb.group({
    text: [''],
  });

  chat!: Chat;

  messages: Array<MessageEntity> = [];
  constructor(
    private socketService:SocketService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
      this.chat = history.state.data;
    if (!this.chat){
      router.navigate(['chats']);
    }
   }

   subscriptionMsg!: Subscription | null;

  ngOnInit(): void {
    this.messageService.getMessages(this.chat._id).subscribe(res => this.messages = res);
    this.socketService.getObsmsg().subscribe(msg => this.messages.unshift(msg));
  }

  sendMessage(){
    this.messageService.createMessage({
      text:this.msgForm.value.text, 
      chat:this.chat._id
    }).subscribe(res=>{}, err => console.warn(err));
    //this.msgForm.reset();
  }

  ngOnDestroy(): void{
    this.subscriptionMsg?.unsubscribe();
    this.subscriptionMsg = null;
  }

  onAddUsersToChat():void{
    this.router.navigate(['chat/addusers'],{state: {data: this.chat}})
  }

  onUsersFromChat():void{
    this.router.navigate(['usersinchat'],{state: {data: this.chat}})
  }
}
