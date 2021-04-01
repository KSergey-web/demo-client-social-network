import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { OrganizationUserLink } from 'src/app/services/interfaces/organization.interface';

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
    private chatService: ChatService) { }

  onSubmit() {
    this.chatService.createChat(this.chatForm.value, this.organizationUserLinks).subscribe(res => this.isConfirmed.emit(true), err => alert(err?.message));
  }

  getArrayWorkers(workers: Array<OrganizationUserLink>){
    this.organizationUserLinks = workers;
  }

  onCancel(){
    this.isConfirmed.emit(false);
  }
}
