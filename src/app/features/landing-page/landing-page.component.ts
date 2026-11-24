import { Component } from '@angular/core';
import { HeaderComponent } from './component/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { WhatsappButtonComponent } from './component/whatsapp-button.component';
import { HeroComponent } from './component/hero/hero.component';
import { AboutComponent } from './component/about/about.component';
import { AcademyGalleryComponent } from './component/academy-gallery/academy-gallery.component';
import { StudentResultsComponent } from './component/student-results/student-results.component';
import { ServicesComponent } from './component/services/services.component';
import { PlansComponent } from './component/plans/plans.component';
import { TestimonialsComponent } from './component/testimonials/testimonials.component';
import { ContactComponent } from './component/contact/contact.component';
import { GroupClassesComponent } from './component/group-classes/group-classes.component';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    AcademyGalleryComponent,
    StudentResultsComponent,
    ServicesComponent,
    PlansComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
    WhatsappButtonComponent,
    GroupClassesComponent
],
  template: `
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-academy-gallery></app-academy-gallery>
      <app-student-results></app-student-results>
      <app-services></app-services>
      <app-group-classes></app-group-classes>
      <app-plans></app-plans>
      <app-testimonials></app-testimonials>
      <app-contact></app-contact>
    </main>
    <app-footer></app-footer>
    <app-whatsapp-button></app-whatsapp-button>
  `
})
export class LandingPageComponent {}