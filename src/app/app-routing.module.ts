import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddUsersComponent } from './messages/add-users/add-users.component';
import { MessagesComponent } from './messages/messages.component';
import { UsersInChatComponent } from './messages/users-in-chat/users-in-chat.component';
import { MyOrganizationsComponent } from './my-organizations/my-organizations.component';
import { MyPageComponent } from './mypage/mypage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SigninComponent } from './signin/signin.component';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
    { path: 'signin', component: SigninComponent},
    { path: 'signup', component: SignUpComponent},
    {path: 'mypage/:id', component: MyPageComponent},
    {path: 'myorganizations', component: MyOrganizationsComponent},
    {path: 'employees', component: EmployeesComponent},
    {path: 'chats', component: ChatsComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'chat/addusers', component: AddUsersComponent},
    {path: 'usersinchat', component: UsersInChatComponent},
    {path: 'teams', component: TeamsComponent},
    {path: 'team', component: TeamComponent},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
