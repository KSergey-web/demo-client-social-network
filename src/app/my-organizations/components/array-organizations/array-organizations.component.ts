import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Organization, OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import { OrganizationService } from 'src/app/services/organization.service';
import { CURRENT_USER_ID } from 'src/app/services/user.service';

@Component({
  selector: 'app-array-organizations',
  templateUrl: './array-organizations.component.html',
  styleUrls: ['./array-organizations.component.scss']
})
export class ArrayOrganizationsComponent implements OnInit {

  userId!: string;
  
  organizationUserLinks: Array<OrganizationUserLink> = [];

  constructor(
    private organizationService: OrganizationService,
     
    ) { }

  ngOnInit(): void {
    const id = localStorage.getItem(CURRENT_USER_ID);
    if (id) this.userId = id;
    this.updateArray();
  }

  onSelect(organization: Organization){
    this.organizationService.currentOrganization.next(organization);
  }

  updateArray(): void {
    this.organizationService.getOrganizationsOfUser(this.userId).subscribe(res => {this.organizationUserLinks = res});
  }
}
