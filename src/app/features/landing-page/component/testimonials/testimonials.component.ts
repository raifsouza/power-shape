import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';
import { GoogleReviewsService } from '../../../../core/services/google-reviews.service';
import { Testimonial } from '../../../../shared/models/testimonial.model';
import { SITE_CONFIG } from '../../../../core/config/site-config';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section id="depoimentos" class="testimonials">
      <div class="container">
        <app-section-title
          eyebrow="Avaliações no Google"
          title="O Que Nossos Alunos Dizem"
          subtitle="Avaliações reais de quem treina na Power Shape Academia."
        ></app-section-title>

        <div class="testimonials-grid">
          <blockquote class="testimonial-card" *ngFor="let item of testimonials()">
            <div class="card-top">
              <div class="stars" [attr.aria-label]="getRating(item) + ' estrelas'">
                {{ getStars(getRating(item)) }}
              </div>
              <span class="google-badge">Google</span>
            </div>

            <p>"{{ item.text }}"</p>

            <footer>
              <img
                *ngIf="item.avatarUrl"
                [src]="item.avatarUrl"
                [alt]="item.studentName"
                class="avatar"
                referrerpolicy="no-referrer"
              />
              <div>
                <strong>{{ item.studentName }}</strong>
                <span *ngIf="item.resultTimeframe">{{ item.resultTimeframe }}</span>
              </div>
            </footer>
          </blockquote>
        </div>

        <div class="google-cta" *ngIf="googleProfileUrl">
          <a [href]="googleProfileUrl" target="_blank" rel="noopener noreferrer">
            Ver todas as avaliações no Google →
          </a>
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

      .card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }

      .stars {
        color: var(--color-primary);
        letter-spacing: 0.12em;
      }

      .google-badge {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-text-secondary);
        border: 1px solid var(--color-surface-light);
        padding: 0.15rem 0.5rem;
        border-radius: 4px;
      }

      p {
        color: var(--color-text-secondary);
        font-style: italic;
        margin-bottom: 1.5rem;
      }

      footer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        border-top: 1px solid var(--color-surface-light);
        padding-top: 1rem;

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

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

    .google-cta {
      margin-top: 2.25rem;
      text-align: center;

      a {
        color: var(--color-primary);
        font-family: var(--font-heading);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: 0.95rem;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  `]
})
export class TestimonialsComponent implements OnInit {
  private readonly googleReviewsService = inject(GoogleReviewsService);

  testimonials = signal<Testimonial[]>([]);
  googleProfileUrl = SITE_CONFIG.googleReviews.googleProfileUrl;

  ngOnInit(): void {
    this.googleReviewsService.getTopReviews().subscribe(data => {
      this.testimonials.set(data);
    });
  }

  getRating(item: Testimonial): number {
    return (item as Testimonial & { rating?: number }).rating ?? 5;
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating));
  }
}