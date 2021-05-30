import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileResourceService } from 'src/app/services/file-resource.service';
import { Organization, OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import { OrganizationService } from 'src/app/services/organization.service';
import { CURRENT_USER_ID } from 'src/app/services/user.service';
import { avatarTypeEnum } from 'src/app/shared/list-workers/enums';

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
    private fileResourceService: FileResourceService
     
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
    this.organizationService.getOrganizationsOfUser(this.userId).subscribe(links => {
      links.forEach(link => {
        this.fileResourceService.getAvatar(link.organization.avatar, avatarTypeEnum.mini).subscribe(res => {
          link.organization.avatarBuffer = res.buffer;
        }, err => console.error(err));
      })
      this.organizationUserLinks = links;
    });
  }
}
