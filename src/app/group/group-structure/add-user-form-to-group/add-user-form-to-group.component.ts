import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/services/interfaces/group.interface';
import { OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import { User } from 'src/app/services/interfaces/user.interface';

@Component({
  selector: 'app-add-user-form-to-group',
  templateUrl: './add-user-form-to-group.component.html',
  styleUrls: ['./add-user-form-to-group.component.scss']
})
export class AddUserFormToGroupComponent implements OnInit {

  organizationUserLinks!: Array<OrganizationUserLink>;
  @Input() group!: Group ;
  fncUsersFromGroup!:() =>Observable<Array<User>>;

  constructor(
    public activeModal: NgbActiveModal,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.fncUsersFromGroup= () =>{return this.groupService.getUsers(this.group._id).pipe(map((links=>{
      let buf: Array<User> = [];
      links.forEach(item=>{
        buf.push(item.user as User);
      })
      return buf;
    })))};
  }

  addUsers(){
    let obs:Observable<User> = this.groupService.addUsersToGroup(this.group._id,this.organizationUserLinks)
    this.activeModal.close(obs);
  }

  getArrayWorkers(workers: Array<OrganizationUserLink>){
    this.organizationUserLinks = workers;
  }
}
