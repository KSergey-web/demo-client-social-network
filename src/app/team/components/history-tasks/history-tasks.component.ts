import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/services/interfaces/task.interface';
import { Team } from 'src/app/services/interfaces/team.interface';
import { TaskService } from 'src/app/services/task.service';
import { UpdateTaskFormComponent } from '../kanban/update-task-form/update-task-form.component';

@Component({
  selector: 'app-history-tasks',
  templateUrl: './history-tasks.component.html',
  styleUrls: ['./history-tasks.component.scss']
})
export class HistoryTasksComponent implements OnInit {

  team: Team;

  tasks: Array<Task> = [];

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal,
    private router: Router,

  ) { 
    this.team = history.state.data;
    if (!this.team){
      router.navigate(['chats']);
    }
  }

  ngOnInit(): void {
    this.updateTasks();
  }

  updateTasks() {
    this.taskService.getHistory(this.team._id).subscribe(
      res => {
        this.tasks = res;
      }, err => {
        console.log(err);
        alert(err.message)
      })
  }

  openModalUpdateTask(task: Task) {
    const modalRef = this.modalService.open(UpdateTaskFormComponent);
    (modalRef.componentInstance as UpdateTaskFormComponent).task = task;
    (modalRef.componentInstance as UpdateTaskFormComponent).isDisableEdit = true;
    modalRef.result.then((task) => {
    }, (err) => {
    })
  }
}
