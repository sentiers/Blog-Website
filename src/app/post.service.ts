import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from './BlogPost';
import { Observable } from 'rxjs';

const perPage = 6;

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

  // https://murmuring-falls-22727.herokuapp.com/

  getPosts(page, tag, category): Observable<BlogPost[]> {

    // set parameter
    let params = {
      page: page,
      perPage: perPage.toString()
    }

    // if the "tag" parameter is not null / undefined, then add &tag=tag to the path.
    if (tag != null || tag != undefined) {
      params["tag"] = tag;
    }

    // if the "category" parameter is not null /undefined, then add &category=category to the path
    if (category != null || category != undefined) {
      params["category"] = category;
    }

    return this.http.get<BlogPost[]>(`https://murmuring-falls-22727.herokuapp.com/api/posts`, { params });
  }

  getPostbyId(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://murmuring-falls-22727.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`https://murmuring-falls-22727.herokuapp.com/api/categories`);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`https://murmuring-falls-22727.herokuapp.com/api/tags`);
  }

  getAllPosts(): Observable<BlogPost[]> {
    // set parameter
    let params = {
      page: "1",
      perPage: Number.MAX_SAFE_INTEGER.toString()
    }

    return this.http.get<BlogPost[]>(`https://murmuring-falls-22727.herokuapp.com/api/posts`, { params });
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`https://murmuring-falls-22727.herokuapp.com/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://murmuring-falls-22727.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`https://murmuring-falls-22727.herokuapp.com/api/posts/${id}`);
  }
}
