import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent {

  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  organizationForm = this.fb.group({
    avatar: [''],
    name: [''],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService) { }

  onSubmit() {
    const dto = {
      ...this.organizationForm.value
    }
    if (!this.imageError){
      dto.avatar = this.selectedFile;
      }
    this.organizationService.createOrganization(dto).subscribe(res => this.isConfirmed.emit(true), err => alert(err?.message));
    console.warn(this.organizationForm.value);
  }

  onCancel(){
  this.isConfirmed.emit(false);
}

  selectedFile: File | null = null;
  onFileSelected(event:any) {
    this.selectedFile = <File>event.target.files[0];
    this.fileChangeEvent(event);
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
}
