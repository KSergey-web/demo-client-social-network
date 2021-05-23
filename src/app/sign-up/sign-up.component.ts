import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { SinginService } from '../signin/services/singin.service';
import { SignUpService } from './services/sign-up.service';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';

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
    file:''
  });
  //this.cardImageBase64 = 'data:image/png;base64,' + res.str;

  selectedFile: File | null = null;

onFileSelected(event:any) {
    this.selectedFile = <File>event.target.files[0];
    this.fileChangeEvent(event);
}



  constructor(
    private signUpService: SignUpService,
    private signInService: SinginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private domSanitizer:DomSanitizer,
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
      dto.file = this.selectedFile;
      console.log(dto);
    this.signUpService.registr(dto).subscribe(()=>{ alert("Succes"),this.router.navigate(['/signin'])}, err=>{ console.log(err),alert('Wrong data!')});;
  }

  imageError!: string | null;
    isImageSaved!: boolean;
    cardImageBase64!: string | null;

    fileChangeEvent(fileInput: any) {
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            // Size Filter Bytes
            const max_size = 20971520;
            const allowed_types = ['image/png', 'image/jpeg'];
            const max_height = 15200;
            const max_width = 25600;

            if (fileInput.target.files[0].size > max_size) {
                this.imageError =
                    'Maximum size allowed is ' + max_size / 1000 + 'Mb';

                return false;
            }

            if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
                this.imageError = 'Only Images are allowed ( JPG | PNG )';
                return false;
            }
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = (rs:any) => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];

                    console.log(img_height, img_width);


                    if (img_height > max_height && img_width > max_width) {
                        this.imageError =
                            'Maximum dimentions allowed ' +
                            max_height +
                            '*' +
                            max_width +
                            'px';
                        return false;
                    } else {
                        const imgBase64Path = e.target.result;
                        this.cardImageBase64 = imgBase64Path;
                        this.isImageSaved = true;
                        // this.previewImagePath = imgBase64Path;
                    }
                    return;
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
        return ;
    }

    removeImage() {
        this.cardImageBase64 = null;
        this.isImageSaved = false;
    }
}
