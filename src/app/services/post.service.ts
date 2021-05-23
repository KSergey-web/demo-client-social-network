import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INWORK_API } from '../app-injection-tokens';
import { Post, PostDTO } from './interfaces/post.interface';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(
    private http: HttpClient,
    @Inject(INWORK_API) private apiUrl:string,
  ) { 
    
  }

  createPost(dto:PostDTO, files: Array<File>): Observable<Post>{
    let formData = serialize(dto);
    for ( let i = 0; i < files.length; i++ ) {
      formData.append( "files", files[i], files[i]['name'] );
    }
    return this.http.post<Post>(`${this.apiUrl}/v1/api/post`, formData);
  }

  getPosts(groupId:string): Observable<Array<Post>>{
    return this.http.get<Array<Post>>(`${this.apiUrl}/v1/api/post/all/group/${groupId}`);
  }
}
