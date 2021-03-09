import { Component, OnInit } from '@angular/core';
import { SinginService } from '../signin/services/singin.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

  constructor(private signinService: SinginService) { }

  public get isLoggedIn(): boolean {
    return this.signinService.isAuthenticated();
  }

  ngOnInit(): void {
  }

}
