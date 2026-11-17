import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section id="sobre" class="about">
      <div class="container about-grid">
        <div class="about-media">
          <img
            src="assets/images/academy/about-space.webp"
            alt="Ambiente interno da Power Shape Academia"
            loading="lazy"
          />
          <div class="experience-badge">
            <strong>ESTD 2022</strong>
            <span>Foco em Performance</span>
          </div>
        </div>

        <div class="about-content">
          <app-section-title
            eyebrow="Sobre a Power Shape"
            title="Mais que uma academia, um ambiente de superação"
            [centered]="false"
          ></app-section-title>

          <p>
            Fundada em 2022, a <strong>Power Shape Academia</strong> nasceu com o propósito de oferecer
            estrutura séria, equipamentos selecionados e suporte técnico para quem busca resultados
            consistentes na musculação e no condicionamento físico.
          </p>
          <p>
            Aqui você encontra um ambiente motivador, organizado e preparado tanto para iniciantes
            quanto para praticantes avançados de bodybuilding.
          </p>

          <ul class="highlights">
            <li *ngFor="let item of highlights">
              <span class="dot"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      background-color: var(--color-surface);
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5rem;
      align-items: center;
    }

    .about-media {
      position: relative;

      img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        border-radius: var(--radius-default);
        border: 1px solid var(--color-surface-light);
      }
    }

    .experience-badge {
      position: absolute;
      bottom: -1.25rem;
      right: 1.5rem;
      background-color: var(--color-primary);
      color: #080808;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-default);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);

      strong {
        display: block;
        font-family: var(--font-heading);
        font-size: 1.5rem;
        line-height: 1.1;
      }

      span {
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
      }
    }

    .about-content p {
      color: var(--color-text-secondary);
      margin-bottom: 1.25rem;
    }

    .highlights {
      list-style: none;
      margin-top: 1.75rem;
      display: grid;
      gap: 0.85rem;

      li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--color-primary);
        flex-shrink: 0;
      }
    }

    @media (max-width: 900px) {
      .about-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }
  `]
})
export class AboutComponent {
  highlights = [
    'Equipamentos modernos e biomecânica precisa',
    'Acompanhamento próximo de profissionais qualificados',
    'Ambiente climatizado, limpo e organizado',
    'Estrutura pensada para treinos de força e hipertrofia'
  ];
}