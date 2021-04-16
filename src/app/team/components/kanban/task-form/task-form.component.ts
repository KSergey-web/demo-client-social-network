import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TasKDTO } from 'src/app/services/interfaces/task.interface';
import { Status } from 'src/app/services/interfaces/team.interface';
import { OrganizationService } from 'src/app/services/organization.service';
import { TaskService } from 'src/app/services/task.service';
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

  taskForm = this.formBuilder.group({
    description: '',
    color: '',
    deadline: '',
    name:'',
  });

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
  ) {
    this.taskForm.value.color = colorEnum.green;
   }

  
  ngOnInit(): void {
  }

  onCreate(){
    if (this.taskForm.value.color == ''){
      alert("Выберите цвет");
      return;
    }
    const taskdto: TasKDTO = {
      color:(this.taskForm.value.color == "Зеленый") ? colorEnum.green : colorEnum.orange,
      name:this.taskForm.value.name,
      description: this.taskForm.value.description,
      status:this.status._id,
      team:this.teamId,
    }
    if (taskdto.color == colorEnum.orange){
      taskdto.deadline =new Date();
      taskdto.deadline.setFullYear(this.taskForm.value.deadline.year);
      taskdto.deadline.setMonth(this.taskForm.value.deadline.month);
      taskdto.deadline.setDate(this.taskForm.value.deadline.day)
    }
    this.taskService.createTask(taskdto).subscribe((res)=>{ 
      alert("Succes");
      this.activeModal.close(res);
    }, err=>{ 
      console.log(err),
      alert(err.message)
    });
  }

  changedColor(e:any) {
    (e.target.value == 'Зеленый') ? this.deadlineVisible = false: this.deadlineVisible = true;  
  }

}
