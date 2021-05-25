import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../services/interfaces/user.interface';
import { OrganizationService } from '../services/organization.service';
import { SharedService } from '../services/shared.service';
import { SocketService } from '../services/socket.service';
import { avatarTypeEnum } from '../shared/list-workers/enums';
import { SinginService } from '../signin/services/singin.service';
import { HeaderOrganization, HeaderUser } from './interfaces/Header';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user!: User;

  organization?: HeaderOrganization;
  
  constructor(
    private router: Router,
    private headerService: HeaderService ,
    private signInService: SinginService,
    private organizationService: OrganizationService,
    private socketService: SocketService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    if (!this.signInService.isAuthenticated()){
      this.router.navigate((['signin']));
    }
    this.initUser();
    this.initOrganization();
    
  }

  initUser() {
    this.headerService.getUser().subscribe(
      user => {
        this.user = user; 
        this.sharedService.getAvatar(user!.avatar as string, avatarTypeEnum.mini).subscribe(file => {
          this.user.avatar = file.avatar;
        });
        
    }, 
      err => {
        console.log(err); 
        alert("user is not available");
        this.router.navigate((['signin']));
      });
  }

  initOrganization() {
    this.organizationService.currentOrganization.subscribe(org => {this.organization = org;})
  }
}
