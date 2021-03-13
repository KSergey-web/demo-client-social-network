import { Component, OnInit } from '@angular/core';
import { CURRENT_USER_ID } from '../services/user.service';

@Component({
  selector: 'app-my-organizations',
  templateUrl: './my-organizations.component.html',
  styleUrls: ['./my-organizations.component.scss']
})
export class MyOrganizationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
