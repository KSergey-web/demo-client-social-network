import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  unwantedUsers: Array<User> = [];

  organizationUserLinks: Array<OrganizationUserLink> = [];

  organization!:Organization;

  @Input() fncGetUsers!: () => Observable<Array<User>>;

  currentUserId!:string;
  constructor(
    private organizationService: OrganizationService,
    ) { 
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem(CURRENT_USER_ID)!;
    this.organization = this.organizationService.currentOrganization.getValue();
    if (this.organization._id != ""){
      this.updateListUsers();
      this.emitWorkers();
    }
    else {
      alert('Организация не выбрана');
    }
  }

  updateListUsers(){
    this.organizationService.getUsersFromOrganization().subscribe(usersFromOrg => {
      this.fncGetUsers().subscribe(users => 
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
    });
  }  

  selectedWorkers: Array<OrganizationUserLink> = [];

  onSelect(link: OrganizationUserLink): void {
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
}
