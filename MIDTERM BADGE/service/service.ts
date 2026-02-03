import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DataService } from '../data.service/data.service';
import { Post } from '../post.model/post.model';
import { TruncatePipe } from '../truncate/truncate';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe],
  templateUrl: './service.html',
  styleUrls: ['./service.css']
})
export class ServicesComponent implements OnInit, OnDestroy {
  // Data observables
  posts$!: Observable<Post[]>;
  filteredPosts$!: Observable<Post[]>;

  // Search stream
  searchTerm$ = new BehaviorSubject<string>('');

  // State management
  isLoading = true;
  hasError = false;
  errorMessage = '';

  // Template bindings
  searchQuery = '';
  allPosts: Post[] = [];
  filteredPosts: Post[] = [];
  resultsCount = 0;

  private subscription?: Subscription;

  constructor(private dataService: DataService) {
    console.log('🔵 ServicesComponent constructor');
  }

  ngOnInit(): void {
    console.log('🔵 ServicesComponent ngOnInit - fetching posts...');
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading = true;
    this.hasError = false;

    // Fetch posts from API
    this.subscription = this.dataService.getPosts().subscribe({
      next: (posts) => {
        console.log('🟢 Posts loaded in Services:', posts.length);
        this.allPosts = posts;
        this.filteredPosts = posts;
        this.resultsCount = posts.length;
        this.isLoading = false;

        // Set up search filtering
        this.setupSearch();
      },
      error: (error) => {
        console.error('🔴 Error loading posts:', error);
        this.errorMessage = 'Failed to load services. Please try again.';
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  setupSearch(): void {
    // Create observable stream for search
    this.searchTerm$.pipe(
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged() // Only emit if value changed
    ).subscribe(searchTerm => {
      this.filterPosts(searchTerm);
    });
  }

  filterPosts(searchTerm: string): void {
    console.log('🔍 Filtering posts with term:', searchTerm);

    if (!searchTerm || searchTerm.trim() === '') {
      // No search term - show all posts
      this.filteredPosts = this.allPosts;
      this.resultsCount = this.allPosts.length;
      console.log('🟢 Showing all posts:', this.resultsCount);
    } else {
      // Filter posts by title or body
      const term = searchTerm.toLowerCase().trim();
      this.filteredPosts = this.allPosts.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.body.toLowerCase().includes(term)
      );
      this.resultsCount = this.filteredPosts.length;
      console.log('🟢 Filtered posts:', this.resultsCount, 'results for:', searchTerm);
    }
  }

  onSearch(): void {
    console.log('🔍 Search triggered:', this.searchQuery);
    this.searchTerm$.next(this.searchQuery);
  }

  clearSearch(): void {
    console.log('🔍 Clearing search');
    this.searchQuery = '';
    this.searchTerm$.next('');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('🔵 Subscription cleaned up');
    }
  }
}
