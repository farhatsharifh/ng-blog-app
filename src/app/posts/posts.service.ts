import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getPosts(){
    this.http.get<{message: string, posts: any}>("http://localhost:3002/api/posts")
      .pipe(map((resData) => {
        return resData.posts.map(post => {
          return {
            id: post._id,
            title: post.title,
            content: post.content,
            imagePath: post.imagePath
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

  getPost(id: string){
    return this.http.get<{_id: string, title: string, content: string, imagePath: string}>(
      "http://localhost:3002/api/posts/" + id
      );
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title)
    this.http.post<{message: string, post: Post}>(
      "http://localhost:3002/api/posts",
      postData
      )
      .subscribe((resData) => {
        const post: Post = {
          "id": resData.post.id,
          "title": resData.post.title,
          "content": resData.post.content,
          "imagePath": resData.post.imagePath
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: FormData | Post;
    if(typeof(image) === 'object'){
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      }
    }
    //const post: Post = { id: id, title: title, content: content, imagePath: null };
    this.http.put("http://localhost:3002/api/posts/" + id, postData)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const post: Post = {
        id: id,
        title: title,
        content: content,
        imagePath: ""
        }
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...updatedPosts]);
        this.router.navigate(['/']);
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
