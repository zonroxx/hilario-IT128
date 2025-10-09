import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-list-posts',
  imports: [CommonModule],
  templateUrl: './list-posts.html',
  styleUrl: './list-posts.css'
})
export class ListPosts {
  posts?: Post[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.http.get<Post[]>('http://localhost:5246/api/Post').subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        console.log(this.posts);
      }
    });
  }
}
