import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from './services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registrForm = this.formBuilder.group({
    login: '',
    password: '',
    email: '',
    name:'',
    surname:'',
  });

  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onRegistr(){
    this.signUpService.registr(this.registrForm.value).subscribe(()=>{ alert("Succes"),this.router.navigate(['/signin'])}, err=>{ console.log(err),alert('Wrong data!')});;
  }
}
