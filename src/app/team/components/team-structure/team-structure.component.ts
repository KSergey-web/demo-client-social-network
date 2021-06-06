import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Team, TeamUserLink } from 'src/app/services/interfaces/team.interface';
import { User } from 'src/app/services/interfaces/user.interface';
import { TeamService } from 'src/app/services/team.service';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';

@Component({
  selector: 'app-team-structure',
  templateUrl: './team-structure.component.html',
  styleUrls: ['./team-structure.component.scss']
})
export class TeamStructureComponent implements OnInit {

  links: Array<TeamUserLink> = [];
  team!: Team;
 
  
  constructor(
    private teamService: TeamService,
    private router: Router,
    private modalService: NgbModal,
    ) { 
      this.team = history.state.data;
    if (!this.team){
      router.navigate(['chats']);
    }
  }

  ngOnInit(): void {

    this.updateListUsers();
  }

  updateListUsers(){
    this.teamService.getTeamUserLinks(this.team._id).subscribe((res:Array<TeamUserLink>) => {
      this.links = res;
    });
  }  

  openAddUserForm() {
    const modalRef = this.modalService.open(AddUserFormComponent);
    (modalRef.componentInstance as AddUserFormComponent).team = this.team;
    modalRef.result.then((obs: Observable<User>)=>{
      obs.subscribe(user => this.updateListUsers(), err => {alert(err.message); console.log(err)})      
    },(err) => {
    })
  }
}
