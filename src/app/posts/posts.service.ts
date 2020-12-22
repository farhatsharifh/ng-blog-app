import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";
import { Post } from './post.model';

const BACKENDURL = environment.apiUrl + "/posts/";

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postsCount: number}>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getPosts(postsPerPage: number, currentPage: number){
    const queryParams = `?pageSize=${postsPerPage}&currentPage=${currentPage}`;
    this.http.get<{message: string, posts: any, maxPosts: number}>(BACKENDURL + queryParams)
      .pipe(map((resData) => {
        return {
        posts: resData.posts.map(post => {
          return {
            id: post._id,
            title: post.title,
            content: post.content,
            imagePath: post.imagePath,
            creator: post.creator
          };
        }),
        maxPosts: resData.maxPosts};
      }))
      .subscribe((transformedPostsData) => {
        this.posts = transformedPostsData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postsCount: transformedPostsData.maxPosts
        });
      });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return this.http.get<{_id: string, title: string, content: string, imagePath: string, creator: string}>(
      BACKENDURL + id
      );
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title)
    this.http.post<{message: string, post: Post}>(
      BACKENDURL,
      postData
      )
      .subscribe((resData) => {
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
        imagePath: image,
        creator: null
      }
    }
    this.http.put(BACKENDURL + id, postData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }
  deletePost(postId: string) {
    return this.http.delete(BACKENDURL + postId);
  }
}
