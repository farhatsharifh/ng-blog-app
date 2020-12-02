import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post Title', content: 'This is first post\'s content'},
  //   {title: 'Second Post Title', content: 'This is second post\'s content'},
  //   {title: 'Third Post Title', content: 'This is third post\'s content'}
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(
    public postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
