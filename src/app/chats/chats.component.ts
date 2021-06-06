import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from '../services/chat.service';
import { FileResourceService } from '../services/file-resource.service';
import { Chat } from '../services/interfaces/chat.interface';
import { OrganizationService } from '../services/organization.service';
import { avatarTypeEnum } from '../shared/list-workers/enums';
import { ChatFormComponent } from './chat-form/chat-form.component';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  chats: Array<Chat> = [];

  constructor(
    private chatService: ChatService,
    private organizationService: OrganizationService,
    private router: Router,
    private fileResourceService: FileResourceService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.updateArray();
  }

  updateArray() {
    this.chatService.getChats().subscribe(chats => {
      console.log(chats);
      chats.forEach(chat => {
        this.fileResourceService.getAvatar(chat.avatar, avatarTypeEnum.mini).subscribe(res => {
         
          chat.avatarBuffer = res.buffer;
        }, err => console.error(err));
      })
      this.chats = chats;
      
      // this.chats = this.chats.sort((chat1: Chat, chat2: Chat) =>{
      //   if (chat1?.message.date < chat2?.message.date) {
      //     console.log(chat1.message.date, chat2.message.date, -1);
      //     return -1;
      //   }
      //   else 
      //   {
      //     console.log(chat1.message.date, chat2.message.date, 1);
      //     return 1;
      //   }
      // })
    }
    );
  }

  
  public showDialog() {
    const orgId = this.organizationService.currentOrganization.getValue()._id;
    if (orgId != "") {
      this.openCreateTaskForm();
    }
    else {
      alert('Организация не выбрана');
    }
  }

  openCreateTaskForm() {
    const modalRef = this.modalService.open(ChatFormComponent);
    modalRef.result.then(
      (task) => {
        this.updateArray();
      },
      (err) => {}
    );
  }


  public toChat(chat: Chat) {
    this.router.navigate(['messages'], { state: { data: chat } })
  }



}
