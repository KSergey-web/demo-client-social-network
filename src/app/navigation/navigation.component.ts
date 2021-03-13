import { Component, OnInit } from '@angular/core';
import { CURRENT_USER_ID } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  userId!: string;

  constructor() { }

  ngOnInit(): void {
    const id = localStorage.getItem(CURRENT_USER_ID);
    if (id) this.userId = id;
  }
}
