import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-footer-posts',
  templateUrl: './footer-posts.component.html',
  styleUrls: ['./footer-posts.component.css']
})
export class FooterPostsComponent implements OnInit {

  posts: Array<BlogPost>;

  constructor(private postData: PostService) { }

  ngOnInit(): void {
    this.postData.getPosts(1, null, null).subscribe(data => this.posts = data.splice(0, 3))
  }

}
