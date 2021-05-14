import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from 'src/app/services/group.service';
import { Group, GroupUserLink } from 'src/app/services/interfaces/group.interface';
import { User } from 'src/app/services/interfaces/user.interface';
import { Location } from '@angular/common';
import { AddUserFormToGroupComponent } from './add-user-form-to-group/add-user-form-to-group.component';
import { Observable } from 'rxjs';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-group-structure',
  templateUrl: './group-structure.component.html',
  styleUrls: ['./group-structure.component.scss']
})
export class GroupStructureComponent implements OnInit {

  links: Array<GroupUserLink> = [];
  group!: Group;


  constructor(
    private groupService: GroupService,
    private router: Router,
    private modalService: NgbModal,
    private location: Location,
    private organizationService: OrganizationService
  ) {
    this.group = history.state.data;
    if (!this.group) {
      this.location.back();
    }
  }

  ngOnInit(): void {

    this.updateListUsers();
  }

  updateListUsers() {
    console.log(this.group.isOpen);
    if (!this.group.isOpen) {
      this.groupService.getUsers(this.group._id).subscribe((res: Array<GroupUserLink>) => {
        console.log(res);
        this.links = res;
      });
    }
    else {
      this.organizationService.getUsersFromOrganization().subscribe(OrgUserLinks=>{
        OrgUserLinks.forEach(OrgUserlink=>{
          this.links.push({roleUser:'user', user: (OrgUserlink.user as User),group:""})
        });
        this.groupService.getUsers(this.group._id).subscribe((GroupUserLinks: Array<GroupUserLink>) => {
          GroupUserLinks.forEach(GroupUserLink => {
            const ind = this.links.findIndex(link=>(link.user as User)._id == (GroupUserLink.user as User)._id);
            if (ind != -1){
              this.links[ind].roleUser=GroupUserLink.roleUser;
            }
          })
        });        
      })
    }
  }

  openAddUserForm() {
    const modalRef = this.modalService.open(AddUserFormToGroupComponent);
    (modalRef.componentInstance as AddUserFormToGroupComponent).group = this.group;
    modalRef.result.then((obs: Observable<User>) => {
      obs.subscribe(res => this.updateListUsers(), err => { alert(err.message); console.log(err) })
    }, (err) => {
    })
  }
}
