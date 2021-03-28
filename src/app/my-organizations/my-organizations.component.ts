import { Component, OnInit, ViewChild } from '@angular/core';
import { CURRENT_USER_ID } from '../services/user.service';
import { ArrayOrganizationsComponent } from './components/array-organizations/array-organizations.component';

@Component({
  selector: 'app-my-organizations',
  templateUrl: './my-organizations.component.html',
  styleUrls: ['./my-organizations.component.scss'],
})
export class MyOrganizationsComponent implements OnInit {

  @ViewChild(ArrayOrganizationsComponent)
  private arrayCmp!: ArrayOrganizationsComponent;

  isModalDialogVisible: boolean = false;
	public showDialog() {
		this.isModalDialogVisible = true;
	}

	public closeModal(res:boolean) {
    if (res){
		this.isModalDialogVisible = false;
    this.arrayCmp.updateArray();
    }
	}

  constructor() { }

  ngOnInit(): void {
  }
}
