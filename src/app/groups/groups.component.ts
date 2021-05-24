import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from '../services/group.service';
import { Group } from '../services/interfaces/group.interface';
import { OrganizationService } from '../services/organization.service';
import { GroupFormComponent } from './group-form/group-form.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: Array<Group> = [];

  organizationId!: string;
  organizationName!: string;

  constructor(
    private groupService:GroupService,
    private organizationService:OrganizationService,
    private router:Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.organizationId = this.organizationService.currentOrganization.getValue()._id;
    this.organizationName =  this.organizationService.currentOrganization.getValue().name;
    if (this.organizationId == ""){
        alert('Выберите организацию');
        this.router.navigate(['myorganizations']);
        return;
      }
      this.updateArray();
  }

  updateArray(){
    this.groupService.getGroups(this.organizationId).subscribe(res => this.groups = res);
  }

  openCreateGroupForm() {
    const modalRef = this.modalService.open(GroupFormComponent);
    (modalRef.componentInstance as GroupFormComponent).organizationId = this.organizationId;
    modalRef.result.then((task) => {
      console.warn(task)
      this.groups.push(task)
    }, (err) => {
    })
  }

  public toGroup(group:Group){
    this.router.navigate(['group'],{state: {data: group}})
  }
}
