import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';
import { TESTIMONIALS_DATA } from '../../data/testimonials.data';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section id="depoimentos" class="testimonials">
      <div class="container">
        <app-section-title
          eyebrow="Avaliações"
          title="O Que Nossos Alunos Dizem"
        ></app-section-title>

        <div class="testimonials-grid">
          <blockquote class="testimonial-card" *ngFor="let item of testimonials">
            <div class="stars" aria-label="5 estrelas">★★★★★</div>
            <p>"{{ item.text }}"</p>
            <footer>
              <strong>{{ item.studentName }}</strong>
              <span *ngIf="item.resultTimeframe">{{ item.resultTimeframe }}</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials {
      background-color: var(--color-surface);
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .testimonial-card {
      background-color: var(--color-background);
      border: 1px solid var(--color-surface-light);
      border-radius: var(--radius-default);
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .stars {
        color: var(--color-primary);
        letter-spacing: 0.15em;
        margin-bottom: 1rem;
      }

      p {
        color: var(--color-text-secondary);
        font-style: italic;
        margin-bottom: 1.5rem;
      }

      footer {
        border-top: 1px solid var(--color-surface-light);
        padding-top: 1rem;

        strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.05rem;
          text-transform: uppercase;
        }

        span {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }
      }
    }
  `]
})
export class TestimonialsComponent {
  testimonials = TESTIMONIALS_DATA;
}