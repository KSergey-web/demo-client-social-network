import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import { CreateTeamDTO } from 'src/app/services/interfaces/team.interface';
import { OrganizationService } from 'src/app/services/organization.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {

  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  organizationUserLinks!: Array<OrganizationUserLink>;

  teamForm = this.fb.group({
    avatar: [''],
    name: [''],
  });

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private organizationService: OrganizationService
    ) { }

  onSubmit() {
    const dto: CreateTeamDTO = {
      ...this.teamForm.value,
      organization: this.organizationService.currentOrganization.getValue()._id,
    }
    this.teamService.createTeam(dto, this.organizationUserLinks).subscribe(res => this.isConfirmed.emit(true), err => alert(err?.message));
  }

  getArrayWorkers(workers: Array<OrganizationUserLink>){
    this.organizationUserLinks = workers;
  }

  onCancel(){
    this.isConfirmed.emit(false);
  }
}
