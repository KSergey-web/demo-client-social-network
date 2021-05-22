import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INWORK_API } from '../app-injection-tokens';
import { avatarTypeEnum } from '../shared/list-workers/enums';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient,
    @Inject(INWORK_API) private apiUrl:string,
  ) { }

  getAvatar(fileName:string, avatartype:avatarTypeEnum): Observable<{avatar:string}>{
    return this.http.post<{avatar:string}>(`${this.apiUrl}/v1/api/file`,{fileName:fileName, avatartype});
  }
}
