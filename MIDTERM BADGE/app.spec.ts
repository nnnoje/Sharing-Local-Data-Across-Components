import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have title "Community Help Desk"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toBe('Community Help Desk');
  });

  it('should render title in navbar', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.navbar-brand h1')?.textContent).toContain('Community Help Desk');
  });
});
