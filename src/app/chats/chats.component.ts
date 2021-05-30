import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { FileResourceService } from '../services/file-resource.service';
import { Chat } from '../services/interfaces/chat.interface';
import { OrganizationService } from '../services/organization.service';
import { avatarTypeEnum } from '../shared/list-workers/enums';


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
    private fileResourceService: FileResourceService
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
    }
    );
  }

  isModalDialogVisible: boolean = false;
  public showDialog() {
    const orgId = this.organizationService.currentOrganization.getValue()._id;
    if (orgId != "") {
      this.isModalDialogVisible = !this.isModalDialogVisible;
    }
    else {
      alert('Организация не выбрана');
    }
  }

  public closeModal(res: boolean) {
    if (res) {
      this.updateArray();
    }
    this.isModalDialogVisible = false;
  }

  public toChat(chat: Chat) {
    this.router.navigate(['messages'], { state: { data: chat } })
  }



}
