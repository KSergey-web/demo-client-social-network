import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TasKDTO } from 'src/app/services/interfaces/task.interface';
import { Status } from 'src/app/services/interfaces/team.interface';
import { OrganizationService } from 'src/app/services/organization.service';
import { TaskService } from 'src/app/services/task.service';
import { IColor } from 'src/app/shared/interfaces';
import { colorEnum } from 'src/app/shared/list-workers/enums';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input() status!: Status;
  @Input() teamId!: string;
  deadlineVisible:boolean = false;

  currentColor!: IColor;

  taskForm = this.formBuilder.group({
    description: '',
    deadline: '',
    name:'',
  });

  colors: IColor[] = [
    { value: colorEnum.green, viewValue: "Без крайнего срока" },
    { value: colorEnum.orange, viewValue: 'Есть крайний срок' },
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
  ) {
    this.taskForm.value.color = colorEnum.green;
   }

  
  ngOnInit(): void {
    this.currentColor = this.colors[0];
  }

  onCreate(){
    const taskdto: TasKDTO = {
      color:this.currentColor.value,
      name:this.taskForm.value.name,
      description: this.taskForm.value.description,
      status:this.status._id,
      team:this.teamId,
    }
    if (taskdto.color == colorEnum.orange){
      taskdto.deadline =new Date();
      taskdto.deadline.setFullYear(this.taskForm.value.deadline.year);
      taskdto.deadline.setMonth(this.taskForm.value.deadline.month - 1);
      taskdto.deadline.setDate(this.taskForm.value.deadline.day);
      taskdto.deadline.setSeconds(0);
    }
    this.taskService.createTask(taskdto).subscribe((res)=>{ 
      this.activeModal.close(res);
    }, err=>{ 
      console.log(err),
      alert(err.message)
    });
  }

  changedColor(value:any) {
    (value == colorEnum.green) ? this.deadlineVisible = false: this.deadlineVisible = true;  
  }

  changeColor(index: number) {
    this.currentColor = this.colors[index];
    this.changedColor(this.currentColor.value);
  }
}
