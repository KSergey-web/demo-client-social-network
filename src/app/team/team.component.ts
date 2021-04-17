import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/services/interfaces/team.interface';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team!: Team;

  constructor(
    private router: Router,
  ) { 
      this.team = history.state.data;
    if (!this.team){
      router.navigate(['teams']);
    }
  }

  ngOnInit(): void {
  }

  onSturctureTeam(){
    this.router.navigate(['team/structure'],{state: {data: this.team}})
  }

  onHistoryTasks(){
    this.router.navigate(['tasks/history'],{state: {data: this.team}})
  }
}

