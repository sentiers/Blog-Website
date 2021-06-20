import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../Comment';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {

  post: BlogPost;
  private querySub: any;
  commentName: string;
  commentText: string;

  constructor(private data: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params => {
      this.data.getPostbyId(params['id']).subscribe(post => {
        this.post = post;
        this.post.views++;
        this.data.updatePostById(this.post._id, this.post).subscribe();
      });
    })
  }


  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }


  submitComment() {
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString(),
    });

    this.data.updatePostById(this.post._id, this.post).subscribe(data => {
      this.commentName = ""
      this.commentText = ""
    })
  }
}
