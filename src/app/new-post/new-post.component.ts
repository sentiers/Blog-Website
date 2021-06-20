import { Component, OnInit } from '@angular/core';
import { BlogPost } from "../BlogPost";
import { Router } from "@angular/router";
import { PostService } from "../post.service";


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  blogPost = new BlogPost();
  tags: string;

  constructor(private router: Router, private postService: PostService) { }

  ngOnInit(): void { }

  formSubmit() {
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toLocaleDateString('en-CA');
    this.blogPost.postedBy = "WEB422 Student";
    this.blogPost.views = 0;
    this.postService.newPost(this.blogPost).subscribe(() => this.router.navigate(['/admin']));
  }
}
