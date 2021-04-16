import { Component, OnInit } from '@angular/core';
import { SinginService } from './services/singin.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    login: '',
    password: ''
  });

  constructor(
    private signInService: SinginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private socketService: SocketService
) { }

  ngOnInit(): void {
    if (this.signInService.isAuthenticated()){
    this.socketService.disconnect();
    this.signInService.logOut();
    }
  }

  onLogin(): void {
    this.signInService.login(this.checkoutForm.value).subscribe(res=>{
      this.socketService.connect();
      this.router.navigate(['mypage', res.user._id]);
    }, err=> alert('Wrong login or password!'));
  }

}
