import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from 'src/app/services/group.service';
import { GroupDTO } from 'src/app/services/interfaces/group.interface';

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
      avatar:"gg",
      isOpen:this.groupForm.value.isOpen
    }
    this.groupService.createGroup(dto).subscribe((res)=>{ 
      this.activeModal.close(res);
    }, err=>{ 
      console.log(err),
      alert(err.message)
    });
  }
}
