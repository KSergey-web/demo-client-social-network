import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { serialize } from 'object-to-formdata';
import { Observable } from 'rxjs';
import { INWORK_API } from '../app-injection-tokens';
import { AddUsersToChatDTO, Chat, ChatDTO } from './interfaces/chat.interface';
import { OrganizationUserLink } from './interfaces/organization.interface';
import { User } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient,
    @Inject(INWORK_API) private apiUrl:string,
  ) { }

  createChat(dto:ChatDTO, users: Array<OrganizationUserLink>) : Observable<Chat>{
    if (users.length != 0){
      dto.users = [];
      users.forEach((link) => {
        dto.users?.push(link.user._id);
      }
      )
    }
    return this.http.post<Chat>(`${this.apiUrl}/v1/api/chat`,serialize(dto));
  }

  addUsersToChat(chatId:string, users: Array<OrganizationUserLink>) : Observable<Chat>{
    let dto:AddUsersToChatDTO = {
      users:[], 
      chat:chatId
    };
      users.forEach((link) => {
        dto.users.push(link.user._id);
      }
    )
    return this.http.post<Chat>(`${this.apiUrl}/v1/api/chat/addUsers`,dto);
  }

  getChats(): Observable<Array<Chat>>{
    return this.http.get<Array<Chat>>(`${this.apiUrl}/v1/api/chat/all`);
  }

  createPrivateChat(userId: string): Observable<Chat>{
    return this.http.post<Chat>(`${this.apiUrl}/v1/api/chat/private/user/${userId}`,{});
  }

  getUsersFromChat(chatId:string): Observable<Array<User>>{
    return this.http.get<Array<User>>(`${this.apiUrl}/v1/api/chat/${chatId}/users`);
  }
}
