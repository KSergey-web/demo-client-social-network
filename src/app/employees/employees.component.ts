import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organization, OrganizationUserLink } from '../services/interfaces/organization.interface';
import { User } from '../services/interfaces/user.interface';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  organizationUserLinks: Array<OrganizationUserLink> = [];

  organization!:Organization;

  constructor(
    private organizationService: OrganizationService,
    private router:Router,
    ) { 
  }

  ngOnInit(): void {
    this.organization = this.organizationService.currentOrganization.getValue();
    console.warn(this.organization);
    if (this.organization._id != ""){
      this.organizationService.getUsersFromOrganization().subscribe(res => {this.organizationUserLinks = res});
    }
  }

  toPageUser(user: User){
    this.router.navigate(['mypage',user._id])
  }
}
