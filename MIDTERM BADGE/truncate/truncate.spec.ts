import { TruncatePipe } from './truncate';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate text longer than limit', () => {
    const result = pipe.transform('This is a very long text that needs truncating', 20);
    expect(result).toBe('This is a very long...');
  });

  it('should not truncate text shorter than limit', () => {
    const result = pipe.transform('Short text', 50);
    expect(result).toBe('Short text');
  });

  it('should handle empty string', () => {
    const result = pipe.transform('', 10);
    expect(result).toBe('');
  });
});
