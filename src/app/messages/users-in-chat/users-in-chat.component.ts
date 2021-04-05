import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/services/interfaces/chat.interface';
import { User } from 'src/app/services/interfaces/user.interface';

@Component({
  selector: 'app-users-in-chat',
  templateUrl: './users-in-chat.component.html',
  styleUrls: ['./users-in-chat.component.scss']
})
export class UsersInChatComponent implements OnInit {

  users: Array<User> = [];
  chat!: Chat;

  constructor(
    private chatService: ChatService,
    private router: Router,
    ) { 
      this.chat = history.state.data;
    if (!this.chat){
      router.navigate(['chats']);
    }
  }

  ngOnInit(): void {
    this.updateListUsers();
  }

  updateListUsers(){
    this.chatService.getUsersFromChat(this.chat._id).subscribe((res:Array<User>) => {
      this.users = res;
    });
  }  
}
