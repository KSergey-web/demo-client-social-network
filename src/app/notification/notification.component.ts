import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import {Notification} from '../services/interfaces/notification.interface'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {



  notifications: Array<Notification> = []
  


  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { 
  }

  ngOnInit(): void {
    this.updateArray();
    this.notificationService.markAllAsReaded().subscribe(res=>{});
  }

  ngOnDestroy(): void{
    this.notificationService.quntNotReadedNotif.next(0);
  }

  updateArray(){
    this.notificationService.getNotifications().subscribe(res => {
      console.log(res)
      this.notifications = res;
    },)
  }
}
