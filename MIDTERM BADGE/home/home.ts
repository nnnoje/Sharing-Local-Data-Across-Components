import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service/data.service';
import { Post } from '../post.model/post.model';
import { TruncatePipe } from '../truncate/truncate';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = true;
  hasError = false;
  errorMessage = '';

  private subscription?: Subscription;

  constructor(private dataService: DataService) {
    console.log('🔵 HomeComponent constructor called');
  }

  ngOnInit(): void {
    console.log('🔵 HomeComponent ngOnInit - starting to fetch posts...');
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading = true;
    this.hasError = false;

    console.log('🔵 Subscribing to getPosts()...');

    this.subscription = this.dataService.getPosts().subscribe({
      next: (posts) => {
        console.log('🟢 SUCCESS! Posts received in component:', posts.length);
        console.log('🟢 First 3 posts:', posts.slice(0, 3));

        this.posts = posts.slice(0, 6); // Show first 6 posts
        this.isLoading = false;
        this.hasError = false;

        console.log('🟢 Component state updated - isLoading:', this.isLoading);
        console.log('🟢 Posts in component:', this.posts.length);
      },
      error: (error) => {
        console.error('🔴 ERROR in component subscription:', error);
        this.errorMessage = 'Failed to load posts. Please refresh the page.';
        this.hasError = true;
        this.isLoading = false;
        this.posts = [];
      },
      complete: () => {
        console.log('🟢 Observable completed');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('🔵 Subscription cleaned up');
    }
  }
}
