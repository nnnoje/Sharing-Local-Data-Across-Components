import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Post } from '../post.model/post.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts from API', (done) => {
    const mockPosts: Post[] = [
      { userId: 1, id: 1, title: 'Test Post 1', body: 'Test Body 1' },
      { userId: 1, id: 2, title: 'Test Post 2', body: 'Test Body 2' }
    ];

    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
      done();
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should cache posts and not make duplicate API calls', () => {
    const mockPosts: Post[] = [
      { userId: 1, id: 1, title: 'Test Post', body: 'Test Body' }
    ];

    // First call
    service.getPosts().subscribe();
    const req1 = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    req1.flush(mockPosts);

    // Second call - should use cache, no new HTTP request
    service.getPosts().subscribe();
    httpMock.expectNone('https://jsonplaceholder.typicode.com/posts');
  });

  it('should handle errors gracefully', (done) => {
    service.getPosts().subscribe(posts => {
      expect(posts).toEqual([]);
      done();
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    req.error(new ProgressEvent('Network error'));
  });

  it('should refresh posts and clear cache', () => {
    const mockPosts: Post[] = [
      { userId: 1, id: 1, title: 'Test Post', body: 'Test Body' }
    ];

    // First call
    service.getPosts().subscribe();
    const req1 = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    req1.flush(mockPosts);

    // Refresh - should make new API call
    service.refreshPosts().subscribe();
    const req2 = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    req2.flush(mockPosts);
  });
});
