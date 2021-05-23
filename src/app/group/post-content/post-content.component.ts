import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {

  
  @Input() content!: string;
  
  constructor(
    public activeModal: NgbActiveModal,

  ) {
   }

  
  ngOnInit(): void {
  }
}
