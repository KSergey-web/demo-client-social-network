import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Task, UpdateTaskDto } from 'src/app/services/interfaces/task.interface';
import { User } from 'src/app/services/interfaces/user.interface';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { colorEnum } from 'src/app/shared/list-workers/enums';

@Component({
  selector: 'app-update-task-form',
  templateUrl: './update-task-form.component.html',
  styleUrls: ['./update-task-form.component.scss']
})
export class UpdateTaskFormComponent implements OnInit {

  @Input() task!: Task;
  deadlineVisible: boolean = false;
  isVisibleArrayAddedUsers: boolean = false;
  @Input()isDisableEdit: boolean = false;
  fncUsersFromTeam!: () => Observable<Array<User>>;
  fncUsersFromTask!: () => Observable<Array<User>>;


  taskForm = this.formBuilder.group({
    description: [''],
    color: '',
    deadline: '',
    name: '',
    answer: '',
  });


  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private teamService: TeamService
  ) { }

  color!: string;

  ngOnInit(): void {
    this.fncUsersFromTeam = () => { 
      console.warn(this.task.team);
      return this.teamService.getUsers(this.task.team as string) };
    this.fncUsersFromTask = () => {
      return new Observable((observer: any) => {
        observer.next(this.task.users);
      });
    }
    this.taskForm.setValue({
      name: this.task.name,
      description: this.task.description,
      color: this.task.color,
      answer: this.task.answer,
      deadline: this.task.deadline ? this.task.deadline.toDateString() : ""
    }, {
      emitEvent: true
    });
    (this.task.color == 'green') ? this.deadlineVisible = false : this.deadlineVisible = true;
    if (this.isDisableEdit) {
      this.taskForm.disable({
      emitEvent: true
    });
  }
    //if ( this.task.color == colorEnum.orange || this.task.color == colorEnum.red) this.initDeadline(this.task.deadline.toString())

  }


  fromFormToDate(): Date {
    const date = new Date();
    date.setFullYear(this.taskForm.value.deadline.year);
    date.setMonth(this.taskForm.value.deadline.month);
    date.setDate(this.taskForm.value.deadline.day);
    return date;
  }

  initDeadline(strDate: string) {
    const date = new Date(strDate);
    console.log(strDate);
    this.taskForm.setValue({ deadline: strDate });
  }

  compare(): UpdateTaskDto {
    let dto: UpdateTaskDto = {};
    if (this.taskForm.value.name != this.task.name) dto.name = this.taskForm.value.name;
    if (this.taskForm.value.description != this.task.description) dto.description = this.taskForm.value.description;
    if (this.taskForm.value.color != this.task.color) {
      dto.color = this.taskForm.value.color;
    }
    if (dto.color != colorEnum.green) {
      console.log((new Date(this.taskForm.value.deadline.get)).getMonth())
      const date = new Date(this.taskForm.value.deadline)
      if (date != this.task.deadline) dto.deadline = date
    }
    if (this.taskForm.value.answer != this.task.answer) dto.answer = this.taskForm.value.answer;
    return dto;
  }

  compareDate(): Date | undefined {
    const date = this.fromFormToDate();
    if (date == this.task.deadline) return undefined;
    return date;
  }

  onSave() {
    if (this.taskForm.value.color == '') {
      alert("Выберите цвет");
      return;
    }
    const dto = this.compare();
    console.log(dto);
    if ((Object.keys(dto).length == 0) && (this.addedUsers.length ==0)){
      this.activeModal.dismiss();
    }
    if (this.addedUsers.length !=0){
      this.taskService.addUsersToTask(this.task._id, this.addedUsers).subscribe((res) => {
      }, err => {
        console.log(err),
          alert(err.message)
      });
  
    }
  
    if (Object.keys(dto).length != 0) {
    this.taskService.updateTask(this.task._id, dto).subscribe((res) => {
      alert("Succes");
      this.activeModal.close(res);
    }, err => {
      console.log(err),
        alert(err.message)
    });
  }
  }

  changedColor(e: any) {
    (e.target.value == 'green') ? this.deadlineVisible = false : this.deadlineVisible = true;
  }

  addedUsers: Array<User> = [];

  getArrayUsers(users: Array<User>) {
    this.addedUsers= users
    this.task.users = (this.task.users as Array<User>).concat(users);
  }

  swith(){
    this.task.users = (this.task.users as Array<User>).concat(this.addedUsers);
    this.isVisibleArrayAddedUsers = false;
  }  

  addUsers() {
    this.isVisibleArrayAddedUsers = true;
  }
}
