import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileResourceService } from '../services/file-resource.service';
import { GroupService } from '../services/group.service';
import { Group } from '../services/interfaces/group.interface';
import { OrganizationService } from '../services/organization.service';
import { avatarTypeEnum } from '../shared/list-workers/enums';
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
    private groupService: GroupService,
    private organizationService: OrganizationService,
    private router: Router,
    private modalService: NgbModal,
    private fileResourceService: FileResourceService
  ) { }

  ngOnInit(): void {
    this.organizationId = this.organizationService.currentOrganization.getValue()._id;
    this.organizationName = this.organizationService.currentOrganization.getValue().name;
    if (this.organizationId == "") {
      alert('Выберите организацию');
      this.router.navigate(['myorganizations']);
      return;
    }
    this.updateArray();
  }

  updateArray() {
    this.groupService.getGroups(this.organizationId).subscribe(res => {
      res.forEach(group => {
        this.fileResourceService.getAvatar(group.avatar, avatarTypeEnum.mini).subscribe(res => {
          group.avatarBuffer = res.buffer;
        }, err => console.error(err));
      })
      this.groups = res
    }
    );
  }

  openCreateGroupForm() {
    const modalRef = this.modalService.open(GroupFormComponent);
    (modalRef.componentInstance as GroupFormComponent).organizationId = this.organizationId;
    modalRef.result.then((group) => {
      this.groups.push(group);
      this.fileResourceService.getAvatar(group.avatar, avatarTypeEnum.mini).subscribe(res => {
        group.avatarBuffer = res.buffer;
      }, err => console.error(err));
    }, (err) => {
    })
  }

  public toGroup(group: Group) {
    this.router.navigate(['group'], { state: { data: group } })
  }
}
