import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN_KEY } from './signin/services/singin.service';
import { MyPageComponent } from './mypage/mypage.component';
import { AUTH_API_URL, INWORK_API } from './app-injection-tokens';
import { httpInterceptorProviders } from './interceptors';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { InfoAboutUserComponent } from './mypage/components/info-about-user/info-about-user.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MyOrganizationsComponent } from './my-organizations/my-organizations.component';
import { ArrayOrganizationsComponent } from './my-organizations/components/array-organizations/array-organizations.component';
import { OrganizationFormComponent } from './my-organizations/components/organization-form/organization-form.component';
import { EmployeesComponent } from './employees/employees.component';
import { MessagesComponent } from './messages/messages.component';
import { ChatsComponent } from './chats/chats.component';
import { ListWorkersComponent } from './shared/list-workers/list-workers.component';
import { ChatFormComponent } from './chats/chat-form/chat-form.component';
import { AddUsersComponent } from './messages/add-users/add-users.component';
import { UsersInChatComponent } from './messages/users-in-chat/users-in-chat.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamFormComponent } from './teams/components/team-form/team-form.component';
import { TeamComponent } from './team/team.component';
import { KanbanComponent } from './team/components/kanban/kanban.component';
import { ContextMenuComponent } from './team/components/kanban/context-menu/context-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskFormComponent } from './team/components/kanban/task-form/task-form.component';
import { TeamStructureComponent } from './team/components/team-structure/team-structure.component';
import { AddUserFormComponent } from './team/components/team-structure/add-user-form/add-user-form.component';
import { UpdateTaskFormComponent } from './team/components/kanban/update-task-form/update-task-form.component';
import { HistoryTasksComponent } from './team/components/history-tasks/history-tasks.component';
import { NewPositionComponent } from './employees/new-position/new-position.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupFormComponent } from './groups/group-form/group-form.component';
import { GroupComponent } from './group/group.component';
import { GroupStructureComponent } from './group/group-structure/group-structure.component';
import { AddUserFormToGroupComponent } from './group/group-structure/add-user-form-to-group/add-user-form-to-group.component';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NotFoundComponent,
    MyPageComponent,
    SignUpComponent,
    HeaderComponent,
    InfoAboutUserComponent,
    NavigationComponent,
    MyOrganizationsComponent,
    ArrayOrganizationsComponent,
    OrganizationFormComponent,
    EmployeesComponent,
    MessagesComponent,
    ChatsComponent,
    ListWorkersComponent,
    ChatFormComponent,
    AddUsersComponent,
    UsersInChatComponent,
    TeamsComponent,
    TeamFormComponent,
    TeamComponent,
    KanbanComponent,
    ContextMenuComponent,
    TaskFormComponent,
    TeamStructureComponent,
    AddUserFormComponent,
    UpdateTaskFormComponent,
    HistoryTasksComponent,
    NewPositionComponent,
    GroupsComponent,
    GroupFormComponent,
    GroupComponent,
    GroupStructureComponent,
    AddUserFormToGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({config:{
      tokenGetter, 
      allowedDomains: environment.tokenWhiteListedDomains
    }}),
    NgbModule,
  ],
  providers: [{
    provide: AUTH_API_URL,
    useValue: environment.inWorkApi
  },
  {
    provide: INWORK_API,
    useValue: environment.inWorkApi
  },
  httpInterceptorProviders
],
  bootstrap: [AppComponent]
})
export class AppModule { }
