import { Component, OnInit } from '@angular/core';
import { SinginService } from './services/singin.service';
import { FormBuilder } from '@angular/forms';

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
) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.signInService.signIn(this.checkoutForm.value);
  }

}
