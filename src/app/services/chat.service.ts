import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INWORK_API } from '../app-injection-tokens';
import { Chat, ChatDTO } from './interfaces/chat.interface';
import { OrganizationUserLink } from './interfaces/organization.interface';

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
    return this.http.post<Chat>(`${this.apiUrl}/v1/api/chat`,dto);
  }

  getChats(): Observable<Array<Chat>>{
    return this.http.get<Array<Chat>>(`${this.apiUrl}/v1/api/chat/all`);
  }
}
