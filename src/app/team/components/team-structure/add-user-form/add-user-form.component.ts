import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import { Team } from 'src/app/services/interfaces/team.interface';
import { User } from 'src/app/services/interfaces/user.interface';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {

  organizationUserLinks!: Array<OrganizationUserLink>;
  @Input() team!: Team ;
  fncUsersFromTeam!:() =>Observable<Array<User>>;

  constructor(
    public activeModal: NgbActiveModal,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.fncUsersFromTeam= () =>{return this.teamService.getUsers(this.team._id)};
  }

  addUsers(){
    let obs:Observable<User> = this.teamService.addUsersToTeam(this.team._id,this.organizationUserLinks)
    this.activeModal.close(obs);
  }

  getArrayWorkers(workers: Array<OrganizationUserLink>){
    this.organizationUserLinks = workers;
  }

}
