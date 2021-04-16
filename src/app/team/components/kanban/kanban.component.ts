import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/services/interfaces/task.interface';
import { Status } from 'src/app/services/interfaces/team.interface';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { ContextMenuModel } from './context-menu/context-menu-model';
import { munuForStatus } from './context-menu/context-menu.constants';
import { TaskFormComponent } from './task-form/task-form.component';

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
  ) { }

  ngOnInit(): void {
    this.updateArrayStatuses();
    this.updateTasks();
  }

  selectedStatus: Status | null = null;

  comparePosition(i: number, status: Status | string):boolean {
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
    this.rightClickMenuItems = munuForStatus;
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

  handleMenuItemClickOnStatus(event: any) {
    switch (event.data) {
      case this.rightClickMenuItems[0].menuEvent:
        this.openCreateTaskForm();
        break;
      case this.rightClickMenuItems[1].menuEvent:
        console.log('To handle formatting');
    }
  }


  openCreateTaskForm() {
    const modalRef = this.modalService.open(TaskFormComponent);
    (modalRef.componentInstance as TaskFormComponent).status = (this.selectedStatus as Status);
    (modalRef.componentInstance as TaskFormComponent).teamId = this.teamId;
    modalRef.result.then((task)=>{
      console.warn(task)
      this.tasks.push(task)
    },(err) => {
    })
  }

  @HostListener('document:click')
  documentClick(): void {
    this.selectedStatus = null;
    this.isDisplayContextMenu = false;
  }
}
