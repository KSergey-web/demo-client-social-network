import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-new-position',
  templateUrl: './new-position.component.html',
  styleUrls: ['./new-position.component.scss']
})
export class NewPositionComponent implements OnInit {

  @Input() link!: OrganizationUserLink;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService 
  ) { }

  positionForm = this.formBuilder.group({
    position: ['', Validators.required],
  });


  ngOnInit(): void {
  }

  onSave(){
    if (this.positionForm.value.position != this.link.position){
      this.organizationService.setNewPosition(this.link.user._id, this.positionForm.value.position).subscribe(res => this.activeModal.close(), err=> {alert(err.message); console.log(err)})
    }
    else 
      this.activeModal.dismiss();
  }
}
