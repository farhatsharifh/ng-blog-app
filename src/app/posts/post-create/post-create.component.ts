import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  newPost = 'NO content';
  enteredValue = '';

  onAddPost(inputEle: HTMLTextAreaElement) {
    this.newPost = inputEle.value;
  }
}