import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { AboutComponent } from './about/about';
import { ServicesComponent } from './service/service';
import { ContactComponent } from './contact/contact';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/home' } // Wildcard route
];
