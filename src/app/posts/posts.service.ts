import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient
  ) {}

  getPosts(){
    this.http.get<{message: string, posts: any}>("http://localhost:3002/api/posts")
      .pipe(map((resData) => {
        return resData.posts.map(post => {
          return {
            id: post._id,
            title: post.title,
            content: post.content
          };
        });
      }))
      .subscribe((postsData) => {
        this.posts = postsData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{message: string, postId: string}>("http://localhost:3002/api/posts", post)
      .subscribe((resData) => {
        const id = resData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3002/api/posts/"+postId)
      .subscribe(() => {
        const postsAfterDel = this.posts.filter(post => post.id !== postId);
        this.posts = postsAfterDel;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
