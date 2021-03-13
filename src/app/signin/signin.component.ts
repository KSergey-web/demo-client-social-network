import { Component, OnInit } from '@angular/core';
import { SinginService } from './services/singin.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.signInService.login(this.checkoutForm.value).subscribe(res=>{
      this.router.navigate(['mypage', res.user._id]);
    }, err=> alert('Wrong login or password!'));
  }

}
