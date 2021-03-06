import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import * as _ from 'lodash';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent {

  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  organizationUserLinks!: Array<OrganizationUserLink>;

  chatForm = this.fb.group({
    avatar: [''],
    name: [''],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    public activeModal: NgbActiveModal,
    ) { }

  onSubmit() {
    const dto = {
      ...this.chatForm.value
    }
    if (!this.imageError){
      dto.avatar = this.selectedFile;
      }
    this.chatService.createChat(dto, this.organizationUserLinks).subscribe(res => this.activeModal.close(res), err => alert(err?.message));
  }

  getArrayWorkers(workers: Array<OrganizationUserLink>){
    this.organizationUserLinks = workers;
  }

  onCancel(){
    this.activeModal.dismiss();
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
