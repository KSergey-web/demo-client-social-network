import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/services/interfaces/task.interface';
import { Status } from 'src/app/services/interfaces/team.interface';
import { SocketService } from 'src/app/services/socket.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { ContextMenuModel } from './context-menu/context-menu-model';
import { menuForStatus, menuForTask } from './context-menu/context-menu.constants';
import { TaskFormComponent } from './task-form/task-form.component';
import { UpdateTaskFormComponent } from './update-task-form/update-task-form.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  @Input() teamId!: string;

  statuses: Array<Status> = [];
  tasks: Array<Task> = [];

  constructor(
    private teamService: TeamService,
    private taskService: TaskService,
    private modalService: NgbModal,
    private socketService: SocketService
  ) { }

  subTaskChanged!: Subscription | null;
  subTaskCreated!: Subscription | null;

  ngOnInit(): void {
    this.socketService.enterToTeamEvent(this.teamId);
    this.subTaskChanged=this.socketService.getTaskChangeStatusObs().subscribe(task => this.updateTasks());
    this.subTaskCreated=this.socketService.getTaskCreatedStatusObs().subscribe(task => this.tasks.push(task));
    this.updateArrayStatuses();
    this.updateTasks();
  }

  ngOnDestroy(): void{
    this.socketService.leaveTeamEvent(this.teamId);
    this.unSubscription(this.subTaskChanged);
    this.unSubscription(this.subTaskCreated);
  }

  unSubscription(sub:Subscription|null){
    sub?.unsubscribe();
    sub = null;
  }

  selectedStatus: Status | null = null;
  selectedTask: Task | null = null;

  comparePosition(i: number, status: Status | string): boolean {
    if (i + 1 == (status as Status).position)
      return true;
    else
      return false;
  }


  updateTasks() {
    this.taskService.getTasks(this.teamId).subscribe(
      res => {
        this.tasks = res;
      }, err => {
        console.log(err);
        alert(err.message)
      })
  }



  updateArrayStatuses() {
    this.teamService.getStatuses(this.teamId).subscribe(
      res => {
        res.sort((st1, st2): number => {
          if (st1.position > st2.position) return 1;
          else return -1;
        })
        this.statuses = res
      }, err => {
        console.log(err);
        alert(err.message)
      })
  }

  title = 'context-menu';

  isDisplayContextMenu!: boolean;
  rightClickMenuItems: Array<ContextMenuModel> = [];
  rightClickMenuPositionX!: number;
  rightClickMenuPositionY!: number;

  displayContextMenuOnStatus(event: any, status: Status) {
    this.selectedStatus = status;
    this.rightClickMenuItems = menuForStatus;
    this.displayContextMenu(event);
  }

  displayContextMenuOnTask(event: any, task: Task) {
    this.selectedTask = task;
    this.rightClickMenuItems = menuForTask;
    this.displayContextMenu(event);
  }


  displayContextMenu(event: any) {
    this.isDisplayContextMenu = true;
    this.rightClickMenuPositionX = event.clientX;
    this.rightClickMenuPositionY = event.clientY;
  }

  getRightClickMenuStyle() {
    return {
      position: 'fixed',
      left: `${this.rightClickMenuPositionX}px`,
      top: `${this.rightClickMenuPositionY}px`
    }
  }

  handleMenuItemClick(event: any){
    if(this.handleMenuItemClickOnStatus(event)) return;
    if(this.handleMenuItemClickOnTask(event)) return;
    console.error(event.data);
  }

  handleMenuItemClickOnStatus(event: any):boolean {
    switch (event.data) {
      case menuForStatus[0].menuEvent:
        this.openCreateTaskForm();
        return true;
    }
    return false;
  }

  handleMenuItemClickOnTask(event: any):boolean {
    switch (event.data) {
      case menuForTask[0].menuEvent:
      {  
        const statusId = this.aboutStatusToTheRightOfTask();
        if (!statusId) { return true}
        this.changeStatusForTask(statusId);
        return true;
      }
      case menuForTask[1].menuEvent:
        {
        const statusId = this.aboutStatusToTheLeftOfTask();
        if (!statusId) { return true}
        this.changeStatusForTask(statusId);
        return true;
        }
      case menuForTask[2].menuEvent:
        {
        this.taskService.completeTask(this.selectedTask!._id).subscribe(res => this.updateTasks());
        return true;
        }
    }
    return false;
  }

  aboutStatusToTheRightOfTask(): null | string {
    let initPosition = (this.selectedTask!.status as Status).position;
    let newPosition = this.statuses.findIndex((status): boolean => {
      return (status.position == 1 + initPosition);
    });
    if (newPosition == -1) {
      return null;
    }
    else return this.statuses[newPosition]._id;
  }

  aboutStatusToTheLeftOfTask(): null | string {
    let initPosition = (this.selectedTask!.status as Status).position;
    let newPosition = this.statuses.findIndex((status): boolean => {
      return (status.position == initPosition - 1);
    });
    if (newPosition == -1) {
      return null;
    }
    else return this.statuses[newPosition]._id;
  }


  openCreateTaskForm() {
    const modalRef = this.modalService.open(TaskFormComponent);
    (modalRef.componentInstance as TaskFormComponent).status = (this.selectedStatus as Status);
    (modalRef.componentInstance as TaskFormComponent).teamId = this.teamId;
    modalRef.result.then((task) => {
      //console.warn(task)
      //this.tasks.push(task)
    }, (err) => {
    })
  }

  openModalUpdateTask(task: Task) {
    const modalRef = this.modalService.open(UpdateTaskFormComponent);
    (modalRef.componentInstance as UpdateTaskFormComponent).task = task;
    modalRef.result.then((task) => {
      this.updateTasks();
    }, (err) => {
      this.updateTasks();
    })
  }

  changeStatusForTask(statusId: string) {
    this.taskService.changeStatusForTask(this.selectedTask!._id, statusId).subscribe(res => {}, err => console.warn(err));
  }

  @HostListener('document:click')
  documentClick(): void {
    this.selectedStatus = null;
    this.isDisplayContextMenu = false;
  }
}
