import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';
import { SERVICES_DATA } from '../../data/services.data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section id="servicos" class="services">
      <div class="container">
        <app-section-title
          eyebrow="Modalidades & Estrutura"
          title="O Que Oferecemos"
          subtitle="Tudo o que você precisa para treinar com segurança, intensidade e evolução contínua."
        ></app-section-title>

        <div class="services-grid">
          <article class="service-card" *ngFor="let service of services">
            <div class="icon-box" aria-hidden="true">
              <span>⚡</span>
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services {
      background-color: var(--color-surface);
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .service-card {
      background-color: var(--color-background);
      border: 1px solid var(--color-surface-light);
      border-radius: var(--radius-default);
      padding: 2rem 1.5rem;
      transition: transform var(--transition-default), border-color var(--transition-default);

      &:hover {
        transform: translateY(-4px);
        border-color: var(--color-primary);
      }

      .icon-box {
        width: 48px;
        height: 48px;
        border-radius: var(--radius-default);
        background-color: rgba(255, 132, 36, 0.14);
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        margin-bottom: 1.25rem;
      }

      h3 {
        font-size: 1.3rem;
        margin-bottom: 0.75rem;
      }

      p {
        color: var(--color-text-secondary);
        font-size: 0.95rem;
      }
    }
  `]
})
export class ServicesComponent {
  services = SERVICES_DATA;
}