import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';
import { TESTIMONIALS_DATA } from '../../data/testimonials.data';

@Component({
  selector: 'app-student-results',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section id="resultados" class="results">
      <div class="container">
        <app-section-title
          eyebrow="Evolução Real"
          title="Resultados de Quem Treina Aqui"
          subtitle="Histórias reais de dedicação, constância e acompanhamento dentro da Power Shape."
        ></app-section-title>

        <div class="results-grid">
          <article class="result-card" *ngFor="let item of resultsWithPhotos">
            <div class="image-wrapper">
              <img
                [src]="item.beforeAfterImageUrl"
                [alt]="'Evolução de ' + item.studentName"
                loading="lazy"
              />
              <span class="timeframe" *ngIf="item.resultTimeframe">{{ item.resultTimeframe }}</span>
            </div>
            <div class="result-info">
              <h3>{{ item.studentName }}</h3>
              <p>"{{ item.text }}"</p>
            </div>
          </article>
        </div>

        <p class="disclaimer">
          * Imagens e relatos publicados mediante autorização expressa dos alunos. Os resultados variam
          individualmente conforme rotina de treinos, alimentação e dedicação de cada praticante.
        </p>
      </div>
    </section>
  `,
  styles: [`
    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.75rem;
    }

    .result-card {
      background-color: var(--color-surface);
      border: 1px solid var(--color-surface-light);
      border-radius: var(--radius-default);
      overflow: hidden;
    }

    .image-wrapper {
      position: relative;

      img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
      }

      .timeframe {
        position: absolute;
        bottom: 0.75rem;
        left: 0.75rem;
        background-color: rgba(8, 8, 8, 0.88);
        border-left: 3px solid var(--color-primary);
        padding: 0.25rem 0.65rem;
        font-family: var(--font-heading);
        font-size: 0.82rem;
        letter-spacing: 0.05em;
      }
    }

    .result-info {
      padding: 1.5rem;

      h3 {
        font-size: 1.25rem;
        color: var(--color-primary);
        margin-bottom: 0.5rem;
      }

      p {
        color: var(--color-text-secondary);
        font-size: 0.95rem;
      }
    }

    .disclaimer {
      margin-top: 2rem;
      text-align: center;
      font-size: 0.82rem;
      color: var(--color-text-secondary);
    }
  `]
})
export class StudentResultsComponent {
  resultsWithPhotos = TESTIMONIALS_DATA.filter(item => !!item.beforeAfterImageUrl);
}