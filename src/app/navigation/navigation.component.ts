import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { CURRENT_USER_ID } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  userId!: string;
  notif:number = 0;
  subNotif?: Subscription | null;

  constructor(
    private notificationService:NotificationService,
  ) { }

  ngOnInit(): void {
    this.notificationService.getNotReaded();
    this.subNotif = this.notificationService.quntNotReadedNotif.subscribe((quntNotif:any) => {
      this.notif=quntNotif;
    })
    const id = localStorage.getItem(CURRENT_USER_ID);
    console.warn(id);
    if (id) this.userId = id;
  }

  ngOnDestroy(): void{
    this.subNotif?.unsubscribe();
    this.subNotif = null;
  }
}
