import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { SinginService } from '../signin/services/singin.service';
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
    birthdate:'',
    patronymic:'',
    telephone:'',
  });

  constructor(
    private signUpService: SignUpService,
    private signInService: SinginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    if (this.signInService.isAuthenticated()){
      this.socketService.disconnect();
      this.signInService.logOut();
    }
  }

  onRegistr(){
    let dto = {...this.registrForm.value};
      dto.birthdate= new Date();
      dto.birthdate.setFullYear(this.registrForm.value.birthdate.year);
      dto.birthdate.setMonth(this.registrForm.value.birthdate.month);
      dto.birthdate.setDate(this.registrForm.value.birthdate.day)
      console.log(dto);
    this.signUpService.registr(dto).subscribe(()=>{ alert("Succes"),this.router.navigate(['/signin'])}, err=>{ console.log(err),alert('Wrong data!')});;
  }

  uploadFile(files?:any) {
    console.log('files', files)
    //     var formData = new FormData();

    // for(let i =0; i < files.length; i++){
    //   formData.append("files", files[i], files[i]['name']);
    //     }
  }
}
