import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CURRENT_USER_ID } from '../services/user.service';
import { SinginService } from '../signin/services/singin.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MyPageComponent implements OnInit {

  userId: string = "";

  constructor(
    private signinService: SinginService,
    private activateRoute: ActivatedRoute
    ) {
      activateRoute.params.subscribe(params=>{
      this.userId=params['id'];
  }, err =>{ 
      let id = localStorage.getItem(CURRENT_USER_ID);
      if (id) 
      {
        this.userId = id;
      }
      console.log(id);
    });
   }

  public get isLoggedIn(): boolean {
    return this.signinService.isAuthenticated();
  }

  ngOnInit(): void {
  }

}
