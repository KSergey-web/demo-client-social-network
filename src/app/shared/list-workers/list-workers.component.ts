import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Organization, OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import { User } from 'src/app/services/interfaces/user.interface';
import { OrganizationService } from 'src/app/services/organization.service';
import { CURRENT_USER_ID } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styleUrls: ['./list-workers.component.scss']
})
export class ListWorkersComponent implements OnInit {

  @Output() arrayWorkers: EventEmitter<Array<OrganizationUserLink>> = new EventEmitter<Array<OrganizationUserLink>>();

  @Output() arrayUsers: EventEmitter<Array<User>> = new EventEmitter<Array<User>>();

  unwantedUsers: Array<User> = [];

  organizationUserLinks: Array<OrganizationUserLink> = [];

  organization!:Organization;

  @Input() fncGetUnwantedUsers!: () => Observable<Array<User>>;

  @Input() fncGetUsers: (() => Observable<Array<User>>) | undefined;

  users: Array<User> = [];

  currentUserId!:string;
  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem(CURRENT_USER_ID)!;
    this.organization = this.organizationService.currentOrganization.getValue();
    if (this.organization._id != ""){
      if (!this.fncGetUsers){
      this.updateListWorkers();
      this.emitWorkers();
      }
      else {
        this.updateListUsers();
        this.emitUsers();
      }
    }
    else {
      alert('Организация не выбрана');
      this.router.navigate(['myorganizations'])
    }
  }

  updateListWorkers(){
    this.organizationService.getUsersFromOrganization().subscribe(usersFromOrg => {
      this.organizationUserLinks = usersFromOrg;
      if (this.fncGetUnwantedUsers){
      this.fncGetUnwantedUsers().subscribe(users => 
        {
          this.unwantedUsers = users;
          for(let i = 0;i < this.unwantedUsers.length;++i){
            for(let y = 0; y < usersFromOrg.length;y++){
              if (this.unwantedUsers[i]._id == usersFromOrg[y].user._id) {
                usersFromOrg.splice(y,1);
                break;
              }
            }
          }
          this.organizationUserLinks = usersFromOrg;
        });
      }
    });
  }
  
  updateListUsers(){
    if (!this.fncGetUsers){
      return;
    }
    this.fncGetUsers().subscribe(users => {
      this.fncGetUnwantedUsers().subscribe(unwanedUsers => 
        {
          this.unwantedUsers = unwanedUsers;
          for(let i = 0;i < this.unwantedUsers.length;++i){
            for(let y = 0; y < users.length;y++){
              if (this.unwantedUsers[i]._id == users[y]._id) {
                users.splice(y,1);
                break;
              }
            }
          }
          this.users = users;
          console.log(this.users);
        });
  })
}

  selectedWorkers: Array<OrganizationUserLink> = [];

  onSelectWorker(link: OrganizationUserLink): void {
      const ind = this.selectedWorkers.indexOf(link);
      if (ind == -1) {
        this.selectedWorkers.push(link);
      }
      else {
        this.selectedWorkers.splice(ind,1);
      }
  }

  emitWorkers(){
    this.arrayWorkers.emit(this.selectedWorkers);
  }

  selectedUsers: Array<User> = [];

  onSelectUser(user: User): void {
      const ind = this.selectedUsers.indexOf(user);
      if (ind == -1) {
        this.selectedUsers.push(user);
      }
      else {
        this.selectedUsers.splice(ind,1);
      }
  }

  emitUsers(){
    this.arrayUsers.emit(this.selectedUsers);
  }
}
