import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import { User } from 'src/app/services/interfaces/user.interface';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-info-about-user',
  templateUrl: './info-about-user.component.html',
  styleUrls: ['./info-about-user.component.scss']
})
export class InfoAboutUserComponent implements OnInit {

  organizationUserLinks: Array<OrganizationUserLink> = [];

  user?: User;

  @Input() userId!: string ;

  constructor(
    private organizationService: OrganizationService,
    private userService: UserService,
    private chatService: ChatService
    ) { 
  }

  ngOnInit(): void {
    this.organizationService.getOrganizationsOfUser(this.userId).subscribe(res => {this.organizationUserLinks = res});
    this.userService.getUser(this.userId).subscribe(res => {this.user = res});
  }
}
