import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button.component';
import { WhatsappService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [PrimaryButtonComponent],
  template: `
    <section id="inicio" class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <span class="hero-tag">ESTD. 2022 • MUSCULAÇÃO & BODYBUILDING</span>
        <h1>
          CONSTRUA SUA MELHOR VERSÃO NA <span>POWER SHAPE</span>
        </h1>
        <p>
          Estrutura completa, equipamentos de alta performance e ambiente focado em resultados reais.
          Comece hoje mesmo sua evolução.
        </p>

        <div class="hero-actions">
          <app-primary-button (clicked)="startEnrollment()">
            Fazer Matrícula no WhatsApp
          </app-primary-button>
          <a href="#sobre" class="secondary-link">
            Conhecer a Academia
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 92vh;
      display: flex;
      align-items: center;
      padding-top: 6rem;
      background-image: url('/images/Fundo.jpg');
      background-size: cover;
      background-position: center;
      background-color: var(--color-background);
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        rgba(8, 8, 8, 0.94) 0%,
        rgba(8, 8, 8, 0.78) 55%,
        rgba(8, 8, 8, 0.55) 100%
      );
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 720px;
      margin-left: 0;
    }

    .hero-tag {
      display: inline-block;
      padding: 0.35rem 0.85rem;
      margin-bottom: 1.25rem;
      background-color: rgba(255, 132, 36, 0.14);
      border-left: 3px solid var(--color-primary);
      font-family: var(--font-heading);
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--color-primary);
    }

    h1 {
      font-size: clamp(2.5rem, 6vw, 4.25rem);
      font-weight: 700;
      margin-bottom: 1.25rem;

      span {
        color: var(--color-primary);
      }
    }

    p {
      font-size: clamp(1.05rem, 2vw, 1.2rem);
      color: var(--color-text-secondary);
      margin-bottom: 2.25rem;
      max-width: 580px;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
    }

    .secondary-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.9rem 1.75rem;
      font-family: var(--font-heading);
      font-size: 1.05rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text);
      border: 2px solid var(--color-text);
      border-radius: var(--radius-default);
      transition: all var(--transition-default);

      &:hover {
        background-color: var(--color-text);
        color: var(--color-background);
      }
    }

    @media (max-width: 600px) {
      .hero-actions {
        flex-direction: column;
        align-items: stretch;
      }
      .secondary-link {
        text-align: center;
      }
    }
  `]
})
export class HeroComponent {
  private readonly whatsappService = inject(WhatsappService);

  startEnrollment(): void {
    this.whatsappService.openGeneralContact();
  }
}