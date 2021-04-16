import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/services/interfaces/chat.interface';
import { OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import { Location } from '@angular/common';
import { User } from 'src/app/services/interfaces/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  organizationUserLinks!: Array<OrganizationUserLink>;

  usersForm = this.fb.group({
  });

  chat!: Chat;
  
  fncUsersFromChat!:() =>Observable<Array<User>>;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private router: Router,
    private location: Location,
    ) {
      this.chat = history.state.data;
    if (!this.chat){
      router.navigate(['chats']);
    }
    this.fncUsersFromChat= () =>{return this.chatService.getUsersFromChat(this.chat._id)};
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.organizationUserLinks.length == 0){
      alert('Выберите сотрудников');
      return;
    }
    this.chatService.addUsersToChat(this.chat._id, this.organizationUserLinks).subscribe(res => this.location.back(), err => alert(err?.message));
  }

  getArrayWorkers(workers: Array<OrganizationUserLink>){
    this.organizationUserLinks = workers;
  }

  onCancel(){
    this.location.back();
  }

}
