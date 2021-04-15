import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/services/interfaces/team.interface';
import { TeamService } from 'src/app/services/team.service';
import { ContextMenuModel } from './context-menu/context-menu-model';
import { munuForStatus } from './context-menu/context-menu.constants';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  @Input() teamId!:string;
  
  statuses: Array<Status> = [];

  constructor(
    private teamService: TeamService,
  ) { }

  ngOnInit(): void {
    this.updateArray();
  }

  selectedStatus: Status | null = null;

  updateArray(){
    this.teamService.getStatuses(this.teamId).subscribe(
      res => {
      res.sort((st1, st2): number =>{
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

  displayContextMenuOnStatus(event:any, status: Status) {
    this.selectedStatus = status;
    console.log(this.selectedStatus);
    this.rightClickMenuItems = munuForStatus;
    this.displayContextMenu(event);
  }

  displayContextMenu(event:any){
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

  handleMenuItemClickOnStatus(event:any) {
    switch (event.data) {
      case this.rightClickMenuItems[0].menuEvent:
           console.log('To handle create task');
           break;
      case this.rightClickMenuItems[1].menuEvent:
          console.log('To handle formatting');
    }
  }

  @HostListener('document:click')
  documentClick(): void {
    this.selectedStatus = null;
    this.isDisplayContextMenu = false;
  }
}
