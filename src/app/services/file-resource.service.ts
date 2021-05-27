import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INWORK_API } from '../app-injection-tokens';
import { avatarTypeEnum } from '../shared/list-workers/enums';

@Injectable({
  providedIn: 'root'
})
export class FileResourceService {
  constructor(
    private http: HttpClient,
    @Inject(INWORK_API) private apiUrl:string,
  ) { }

  getAvatar(fileId:string, avatartype:avatarTypeEnum): Observable<{buffer:string}>{
    return this.http.get<{buffer:string}>(`${this.apiUrl}/v1/api/file-resource/${fileId}/image/type/${avatartype}`);
  }
}
