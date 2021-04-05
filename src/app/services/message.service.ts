import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INWORK_API } from '../app-injection-tokens';
import { MessageDTO, MessageEntity } from './interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient,
    @Inject(INWORK_API) private apiUrl:string,
  ) { }

  createMessage(dto:MessageDTO) : Observable<MessageEntity>{
    return this.http.post<MessageEntity>(`${this.apiUrl}/v1/api/message`,dto);
  }

  getMessages(chatId:string): Observable<Array<MessageEntity>>{
    return this.http.get<Array<MessageEntity>>(`${this.apiUrl}/v1/api/message/all/chat/${chatId}`);
  }
}
