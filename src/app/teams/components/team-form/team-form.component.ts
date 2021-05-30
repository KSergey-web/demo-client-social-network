import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import { CreateTeamDTO } from 'src/app/services/interfaces/team.interface';
import { OrganizationService } from 'src/app/services/organization.service';
import { TeamService } from 'src/app/services/team.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {

  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  organizationUserLinks!: Array<OrganizationUserLink>;

  teamForm = this.fb.group({
    avatar: [''],
    name: [''],
  });

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private organizationService: OrganizationService
    ) { }

  onSubmit() {
    const dto: CreateTeamDTO = {
      name: this.teamForm.value.name,
      organization: this.organizationService.currentOrganization.getValue()._id,
    }
    if (!this.imageError){
      dto.avatar = this.selectedFile;
    }
    this.teamService.createTeam(dto, this.organizationUserLinks).subscribe(res =>{
      console.log(res); this.isConfirmed.emit(true)}, err => alert(err?.message));
  }

  getArrayWorkers(workers: Array<OrganizationUserLink>){
    this.organizationUserLinks = workers;
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
