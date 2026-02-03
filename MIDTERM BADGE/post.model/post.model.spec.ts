import { Post } from './post.model';

describe('Post Model', () => {
  it('should create a post object', () => {
    const post: Post = {
      userId: 1,
      id: 1,
      title: 'Test Title',
      body: 'Test Body'
    };

    expect(post).toBeTruthy();
    expect(post.userId).toBe(1);
    expect(post.id).toBe(1);
    expect(post.title).toBe('Test Title');
    expect(post.body).toBe('Test Body');
  });
});
