import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Power Shape Academia | Musculação e Bodybuilding'
  },
  {
    path: '**',
    redirectTo: ''
  }
];