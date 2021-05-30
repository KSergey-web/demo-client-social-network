import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileResourceService } from '../services/file-resource.service';
import { Team } from '../services/interfaces/team.interface';
import { OrganizationService } from '../services/organization.service';
import { TeamService } from '../services/team.service';
import { avatarTypeEnum } from '../shared/list-workers/enums';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: Array<Team> = [];

  organizationId!: string;

  constructor(
    private teamService:TeamService,
    private organizationService:OrganizationService,
    private router:Router,
    private fileResourceService: FileResourceService
  ) { }

  ngOnInit(): void {
    this.organizationId= this.organizationService.currentOrganization.getValue()._id;
    if (this.organizationId == ""){
        alert('Выберите организацию');
        this.router.navigate(['myorganizations']);
        return;
      }
      this.updateArray();
  }

  updateArray(){
    this.teamService.getTeams(this.organizationId).subscribe(res =>{ 
      res.forEach(team => {
        this.fileResourceService.getAvatar(team.avatar, avatarTypeEnum.mini).subscribe(res => {
          team.avatarBuffer = res.buffer;
        }, err => console.error(err));
      });
      this.teams = res});
  }

  isModalDialogVisible: boolean = false;
	public showDialog() {
		this.isModalDialogVisible = !this.isModalDialogVisible;
	}

	public closeModal(res:boolean) {
    if (res){
    this.updateArray();
    }
    this.isModalDialogVisible = false;
	}

  public toTeam(team:Team){
    this.router.navigate(['team'],{state: {data: team}})
  }

}
