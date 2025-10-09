import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-detail',
  imports: [],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css'
})
export class PostDetail {
  private routeSub: Subscription = new Subscription();
  private id: number = 0;
  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.initData();
  }
  initData(): void {
    this.http.get<Post>('http://localhost:5246/api/Post/' + this.id).subscribe({
      next: (data: Post) => {
        this.post = data;
        console.log(this.post);
      }
    });
  }
}
