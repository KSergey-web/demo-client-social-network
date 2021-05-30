import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from 'src/app/services/group.service';
import { GroupDTO } from 'src/app/services/interfaces/group.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  @Input() organizationId!: string;


  groupForm = this.formBuilder.group({
    description: '',
    isOpen: '',
    avatar: '',
    name:['',Validators.required],
  });

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
  ) {
   }

  ngOnInit(): void {
    this.groupForm.controls.isOpen.setValue(true)
  }
  


  onCreate(){
    const dto: GroupDTO = {
      name:this.groupForm.value.name,
      description: this.groupForm.value.description,
      organization:this.organizationId,
      isOpen:this.groupForm.value.isOpen,
      avatar: null,
    }
    if (!this.imageError){
      dto.avatar = this.selectedFile;
      }
    this.groupService.createGroup(dto).subscribe((res)=>{ 
      this.activeModal.close(res);
    }, err=>{ 
      console.log(err),
      alert(err.message)
    });
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
