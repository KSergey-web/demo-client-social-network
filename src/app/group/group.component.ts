import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from '../services/interfaces/group.interface';
import { Post, PostDTO } from '../services/interfaces/post.interface';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  group!: Group;
  posts: Array<Post> = []
  
  postForm = this.formBuilder.group({
    text:['',Validators.required],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private postService: PostService
  ) { 
      this.group = history.state.data;
    if (!this.group){
      router.navigate(['groups']);
    }
  }

  ngOnInit(): void {
    this.updateArray()
  }

  updateArray(){
    this.postService.getPosts(this.group._id).subscribe(res => this.posts = res);
  }

  onCreatePost(){
    const dto : PostDTO={
      text: this.postForm.value.text,
      group: this.group._id,
    }
    this.postService.createPost(dto).subscribe(res => {
      this.posts.unshift(res);
      this.postForm.controls.text.setValue('');
    });
  }
}
