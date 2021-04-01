import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Organization, OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import { OrganizationService } from 'src/app/services/organization.service';
import { CURRENT_USER_ID } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styleUrls: ['./list-workers.component.scss']
})
export class ListWorkersComponent implements OnInit {

  @Output() arrayWorkers: EventEmitter<Array<OrganizationUserLink>> = new EventEmitter<Array<OrganizationUserLink>>();

  organizationUserLinks: Array<OrganizationUserLink> = [];

  organization!:Organization;

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
    this.organizationService.getUsersFromOrganization().subscribe(res => {
      this.organizationUserLinks = res;
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
