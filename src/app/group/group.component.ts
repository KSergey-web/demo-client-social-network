import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { INWORK_API } from '../app-injection-tokens';
import { FileResAndBuffer, FileResource } from '../services/interfaces/file-resource.interface';
import { Group } from '../services/interfaces/group.interface';
import { Post, PostDTO } from '../services/interfaces/post.interface';
import { PostService } from '../services/post.service';
import { PostContentComponent } from './post-content/post-content.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  group!: Group;
  posts: Array<Post> = []
  selectedFiles: Array<File>= [];
  visibleCreatePost: boolean = false;
  
  postForm = this.formBuilder.group({
    text:['',Validators.required],
  });

  getFileHref ='';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private modalService: NgbModal,
    @Inject(INWORK_API) private apiUrl:string,
  ) { 
      this.group = history.state.data;
    if (!this.group){
      router.navigate(['groups']);
    }
    this.getFileHref = `${this.apiUrl}/v1/api/file-resource/`;
  }

  ngOnInit(): void {
    this.updateArray()
  }

  updateArray(){
    this.postService.getPosts(this.group._id).subscribe(res => {this.posts = res, console.log(res[0])});
  }

  onCreatePost(){
    const dto : PostDTO={
      text: this.postForm.value.text,
      group: this.group._id,
    }
    this.postService.createPost(dto,this.selectedFiles).subscribe(res => {
      this.posts.unshift(res);
      this.postForm.controls.text.setValue(''); 
    }, err=>{console.warn(err)});
  }

  getImage(file: FileResAndBuffer){
    return 'data:'+file.fileRes.mimetype+';base64,'+file.buffer;
  }

  onSturctureGroup(){
    this.router.navigate(['group/structure'],{state: {data: this.group}})
  }



  
  onFileSelected(event:any) {
    for(let i = 0; i < event.target.files.length; i++){
      this.selectedFiles.push(<File>event.target.files[i]);
    }
  }

  deleteFile(file: File){
    const ind = this.selectedFiles.indexOf(file);
    this.selectedFiles.splice(ind,1);
  }

  openContentImage(content: string) {
    const modalRef = this.modalService.open(PostContentComponent,{ size: 'xl' });
    (modalRef.componentInstance as PostContentComponent).content = content;
  }
}
