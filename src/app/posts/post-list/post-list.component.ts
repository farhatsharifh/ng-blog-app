import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  // posts = [
  //   {title: 'First Post Title', content: 'This is first post\'s content'},
  //   {title: 'Second Post Title', content: 'This is second post\'s content'},
  //   {title: 'Third Post Title', content: 'This is third post\'s content'}
  // ];
  @Input() posts = [];

}
