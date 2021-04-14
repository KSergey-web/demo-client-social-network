import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/services/interfaces/team.interface';
import { TeamService } from 'src/app/services/team.service';

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

  updateArray(){
    this.teamService.getStatuses('6076ea0994939b511ceeaf35').subscribe(
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
}
