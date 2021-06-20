import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddStatusDTO, Status } from 'src/app/services/interfaces/team.interface';
import { TeamService } from 'src/app/services/team.service';
import { directionEnum } from 'src/app/shared/list-workers/enums';

@Component({
  selector: 'app-add-status-form',
  templateUrl: './add-status-form.component.html',
  styleUrls: ['./add-status-form.component.scss']
})
export class AddStatusFormComponent implements OnInit {

  @Input() status!: Status;
  @Input() teamId!: string;
  @Input() direction!: directionEnum;
  deadlineVisible:boolean = false;

  statusForm = this.formBuilder.group({
    name:'',
  });

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private teamService: TeamService,
  ) {
   }

  
  ngOnInit(): void {
  }

  onCreate(){
    const dto: AddStatusDTO = {
      team: this.teamId,
      currentPosition: this.status.position,
      direction: this.direction,
      name:this.statusForm.value.name,
    }
    this.teamService.addStatus(dto).subscribe((res)=>{ 
      this.activeModal.close(res);
    }, err=>{ 
      console.log(err),
      alert(err.message)
    });
  }
}
