import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, shareReplay, tap, retry } from 'rxjs/operators';
import { Post } from '../post.model/post.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private postsCache$: Observable<Post[]> | null = null;

  constructor(private http: HttpClient) {
    console.log('DataService initialized');
  }

  getPosts(): Observable<Post[]> {
    // If we don't have cached posts, fetch them
    if (!this.postsCache$) {
      console.log('Fetching posts from API...');
      this.postsCache$ = this.http.get<Post[]>(this.apiUrl).pipe(
        retry(2), // Retry failed requests up to 2 times
        tap(posts => {
          console.log('✅ Posts received:', posts.length);
          console.log('First post:', posts[0]);
        }),
        shareReplay(1), // Cache the result and share with all subscribers
        catchError(error => {
          console.error('❌ Error fetching posts:', error);
          console.error('Error details:', {
            message: error.message,
            status: error.status,
            url: error.url
          });
          this.postsCache$ = null; // Clear cache on error so next call retries
          // Return empty array instead of throwing error
          return of([]);
        })
      );
    } else {
      console.log('✅ Using cached posts');
    }
    return this.postsCache$;
  }

  // Method to force refresh (clears cache)
  refreshPosts(): Observable<Post[]> {
    console.log('Refreshing posts (clearing cache)...');
    this.postsCache$ = null;
    return this.getPosts();
  }
}
