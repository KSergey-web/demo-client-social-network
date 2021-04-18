import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HireUserByLoginDTO, Organization, OrganizationUserLink } from '../services/interfaces/organization.interface';
import { User } from '../services/interfaces/user.interface';
import { OrganizationService } from '../services/organization.service';
import { NewPositionComponent } from './new-position/new-position.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  organizationUserLinks: Array<OrganizationUserLink> = [];

  organization!:Organization;

  constructor(
    private organizationService: OrganizationService,
    private router:Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    ) { 
  }

  addWorkerForm = this.formBuilder.group({
    login: '',
    position: ''
  });


  ngOnInit(): void {
    this.organization = this.organizationService.currentOrganization.getValue();
    if (this.organization._id == ""){
      alert('Выберите организацию');
      this.router.navigate(['myorganizations']);
      return;
    }
      this.updateListUsers();
  }

  openNewPositionForm(link: OrganizationUserLink) {
    const modalRef = this.modalService.open(NewPositionComponent);
    (modalRef.componentInstance as NewPositionComponent).link = link;
      modalRef.result.then((task) => {
      this.updateListUsers();
    }, (err) => {
    })
  }

  updateListUsers(){
    this.organizationService.getUsersFromOrganization().subscribe(res => {
      console.log(res[0]);
      this.organizationUserLinks = res
    });
  }

  toPageUser(user: User){
    this.router.navigate(['mypage',user._id])
  }

 hireWorker(){
  if (this.organization._id == ""){
    alert("Организация не выбрана");
    return;
  }
   const dto: HireUserByLoginDTO = {
     organizationId: this.organization._id,
     position:this.addWorkerForm.value.position,
     login: this.addWorkerForm.value.login,

   }
   this.organizationService.hireWorker(dto).subscribe(res => this.updateListUsers(), err => {
    console.warn(err);
    this.errHire(err.status)});
 }

 errHire(status: number){
  switch (status) {
    case 404:
      alert('Пользователь не найден');
      break;
    case 409:
      alert('Пользователь уже есть в организации');
      break;
    default:
      alert(`Error ${status}`);
  }
  return;
}


}
