import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization.service';

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
    this.organizationService.createOrganization(this.organizationForm.value).subscribe(res => this.isConfirmed.emit(true), err => alert(err?.message));
    console.warn(this.organizationForm.value);
  }
}
