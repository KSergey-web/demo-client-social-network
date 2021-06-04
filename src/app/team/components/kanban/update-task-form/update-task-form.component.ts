import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { INWORK_API } from 'src/app/app-injection-tokens';
import { Task, UpdateTaskDto } from 'src/app/services/interfaces/task.interface';
import { Team } from 'src/app/services/interfaces/team.interface';
import { User } from 'src/app/services/interfaces/user.interface';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { IColor } from 'src/app/shared/interfaces';
import { colorEnum } from 'src/app/shared/list-workers/enums';



@Component({
  selector: 'app-update-task-form',
  templateUrl: './update-task-form.component.html',
  styleUrls: ['./update-task-form.component.scss']
})
export class UpdateTaskFormComponent implements OnInit {

  @Input() task!: Task;
  @Input() team!: Team;
  deadlineVisible: boolean = false;
  isVisibleArrayAddedUsers: boolean = false;
  @Input() isDisableEdit: boolean = false;
  fncUsersFromTeam!: () => Observable<Array<User>>;
  fncUsersFromTask!: () => Observable<Array<User>>;
  currentColor!: IColor;
  currentDate: string ='';
  time = {hour: 13, minute: 30};
  getFileHref = '';

  colors: IColor[] = [
    { value: colorEnum.green, viewValue: "Без крайнего срока" },
    { value: colorEnum.orange, viewValue: 'Есть крайний срок' },
    { value: colorEnum.red, viewValue: 'Крайний срок истек' }
  ];

  taskForm = this.formBuilder.group({
    description: [''],
    color: '',
    deadline: '',
    name: '',
    answer: '',
  });
  selectedFile: File | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private teamService: TeamService,
    @Inject(INWORK_API) private apiUrl:string,
  ) { 
    this.getFileHref = `${this.apiUrl}/v1/api/file-resource/`;
  }

  color!: string;
  initUsers: Array<User> = []

  ngOnInit(): void {
    console.log(this.task.files);
    this.currentColor = this.colors[0];
    this.colors.find(item => {
       if (item.value == this.task.color) 
       { this.currentColor = item; 
        return true; 
      } 
      return false 
    });
    this.initUsers = (this.task.users as Array<User>).slice();
    this.fncUsersFromTeam = () => {
      return this.teamService.getUsers(this.task.team as string)
    };
    this.fncUsersFromTask = () => {
      return new Observable((observer: any) => {
        observer.next(this.task.users);
      });
    }
    const date = this.task.deadline ? this.task.deadline : new Date();
    this.taskForm.setValue({
      name: this.task.name,
      description: this.task.description,
      color: this.task.color,
      answer: this.task.answer,
      deadline:{year:date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}
    }, {
      emitEvent: true
    });
    this.currentDate= date.toJSON().slice(0,12);
    this.time.hour= this.task.deadline ? this.task.deadline.getHours() : 0;
    this.time.minute=this.task.deadline ? this.task.deadline.getMinutes() : 0;
    (this.task.color == 'green') ? this.deadlineVisible = false : this.deadlineVisible = true;
    if (this.isDisableEdit) {
      this.taskForm.disable({
        emitEvent: true
      });
    }
  }


  fromFormToDate(): Date {
    const date = new Date();
    date.setFullYear(this.taskForm.value.deadline.year);
    date.setMonth(this.taskForm.value.deadline.month-1);
    date.setDate(this.taskForm.value.deadline.day);
    date.setHours(this.time.hour);
    date.setMinutes(this.time.minute);
    return date;
  }


  compare(): UpdateTaskDto {
    let dto: UpdateTaskDto = {};
    if (this.taskForm.value.name != this.task.name) dto.name = this.taskForm.value.name;
    if (this.taskForm.value.description != this.task.description) dto.description = this.taskForm.value.description;
    dto.color =  this.task.color;
    if (this.currentColor.value  != this.task.color) {
      dto.color = this.currentColor.value;
    }
    if (dto.color != colorEnum.green) {
      const date = this.compareDate();
      if (date) dto.deadline = date
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
    if ((Object.keys(dto).length == 0) && (this.addedUsers.length == 0) && (this.deletedUsers.length == 0)) {
      this.activeModal.dismiss();
    }
    //this.checkAdded();
    if (this.addedUsers.length != 0) {
      this.taskService.addUsersToTask(this.task._id, this.addedUsers).subscribe((res) => {
      }, err => {
      });
    }
    //this.checkDeleted();
    if (this.deletedUsers.length != 0) {

      this.taskService.deleteUsersFromTask(this.task._id, this.deletedUsers).subscribe((res) => {
      }, err => {
      });
    }

    if (Object.keys(dto).length != 0) {
      this.taskService.updateTask(this.task._id, dto).subscribe((res) => {
        this.activeModal.close(res);
      }, err => {
        console.log(err);
      });
    }
  }

  changedColor(value: any) {
    (value == 'green') ? this.deadlineVisible = false : this.deadlineVisible = true;
  }

  addedUsers: Array<User> = [];
  deletedUsers: Array<User> = [];

  getArrayUsers(users: Array<User>) {
    this.addedUsers = users
    this.task.users = (this.task.users as Array<User>).concat(users);
  }

  swith() {
    this.isVisibleArrayAddedUsers = false;
    
  }

  concatUsers(){
    this.task.users = (this.task.users as Array<User>).concat(this.addedUsers);
    this.swith();
  }

  addUsers() {
    this.isVisibleArrayAddedUsers = true;
  }

  deleteUser(user: User) {
    const ind = this.deletedUsers.indexOf(user);
    if (ind == -1) {
      this.deletedUsers.push(user);
    }
    else {
      this.deletedUsers.splice(ind, 1);
    }
  }

  changeColor(index: number) {
    this.currentColor = this.colors[index];
    this.taskForm.controls.color.setValue(this.currentColor.value);
    this.changedColor(this.currentColor.value);
  }


  onFileSelected(event:any) {
    this.selectedFile = <File>event.target.files[0];
    this.taskService.addfileToTask(this.selectedFile,this.task._id).subscribe((res:Task) => {console.log(res); this.task.files=res.files},err=>{console.log(err)});
}

deleteFile(fileId: string){
  this.taskService.deleteFileFromTask(fileId,this.task._id).subscribe((res:Task) => {console.log(res); this.task.files=res.files},err=>{console.log(err)});
}

  // checkAdded(){
  //   this.initUsers.forEach(user => {
  //     const ind = this.addedUsers.findIndex(added=> added._id == user._id)
  //     if (ind == -1){
  //       this.addedUsers.splice(ind,1);
  //     }
  //   })
  // }

  // checkDeleted(){
  //   console.warn(this.deletedUsers);
  //   this.initUsers.forEach(user => {

  //     const ind = this.deletedUsers.findIndex(deleted => {
  //       console.warn(deleted);
  //       console.warn(user)
  //       return deleted._id == user._id})
  //     if (ind == -1){
  //       console.log(ind);
  //       this.deletedUsers.splice(ind,1);
  //     }
  //   })
  //   console.log(this.deletedUsers);
  // }
}
