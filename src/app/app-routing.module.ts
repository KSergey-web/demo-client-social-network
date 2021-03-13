import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrganizationsComponent } from './my-organizations/my-organizations.component';
import { MyPageComponent } from './mypage/mypage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
    { path: 'signin', component: SigninComponent},
    { path: 'signup', component: SignUpComponent},
    {path: 'mypage/:id', component: MyPageComponent},
    {path: 'myorganizations', component: MyOrganizationsComponent},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
