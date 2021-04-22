import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import { User } from 'src/app/services/interfaces/user.interface';
import { OrganizationService } from 'src/app/services/organization.service';
import { CURRENT_USER_ID, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-info-about-user',
  templateUrl: './info-about-user.component.html',
  styleUrls: ['./info-about-user.component.scss']
})
export class InfoAboutUserComponent implements OnInit {

  organizationUserLinks: Array<OrganizationUserLink> = [];

  user?: User;
  currentUserId!: string;

  @Input() userId!: string ;

  constructor(
    private organizationService: OrganizationService,
    private userService: UserService,
    private chatService: ChatService
    ) { 
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem(CURRENT_USER_ID)!;
    this.organizationService.getOrganizationsOfUser(this.userId).subscribe(res => {this.organizationUserLinks = res});
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res
      setTimeout(()=>this.userService.getStatusUser(this.user!._id).subscribe((res: any) => {
        this.user!.status =res.status;
      }, err => console.log(err)),1);
    });
  }

  checkCurretUser(){
    if (this.user?._id==this.currentUserId){
      return true;
    }
    else return false;
  }
}
