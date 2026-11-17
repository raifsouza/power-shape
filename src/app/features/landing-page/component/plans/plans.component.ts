import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button.component';
import { PLANS_DATA } from '../../data/plans.data';
import { WhatsappService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, PrimaryButtonComponent],
  template: `
    <section id="planos" class="plans">
      <div class="container">
        <app-section-title
          eyebrow="Investimento"
          title="Escolha Seu Plano"
          subtitle="Selecione o formato ideal para o seu objetivo e finalize sua matrícula direto pelo WhatsApp."
        ></app-section-title>

        <div class="plans-grid">
          <article
            class="plan-card"
            *ngFor="let plan of plans"
            [class.highlighted]="plan.highlighted"
          >
            <span class="badge" *ngIf="plan.badgeText">{{ plan.badgeText }}</span>

            <h3>{{ plan.name }}</h3>
            <p class="plan-desc" *ngIf="plan.description">{{ plan.description }}</p>

            <div class="price-box">
              <span class="price">{{ plan.price }}</span>
              <span class="period">{{ plan.periodicity }}</span>
            </div>

            <ul class="benefits">
              <li *ngFor="let benefit of plan.benefits">
                <span class="check">✓</span>
                <span>{{ benefit }}</span>
              </li>
            </ul>

            <app-primary-button
              [variant]="plan.highlighted ? 'solid' : 'outline'"
              [fullWidth]="true"
              (clicked)="selectPlan(plan.name)"
            >
              Quero Este Plano
            </app-primary-button>
          </article>
        </div>
      </div>
    </section>
  `,
 styles: [`
    .plans-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
      align-items: stretch;
    }

    @media (max-width: 1120px) {
      .plans-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }
    }

    @media (max-width: 640px) {
      .plans-grid {
        grid-template-columns: 1fr;
      }
    }

    .plan-card {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: var(--color-surface);
      border: 1px solid var(--color-surface-light);
      border-radius: var(--radius-default);
      padding: 2rem 1.35rem;

      &.highlighted {
        border: 2px solid var(--color-primary);
        background: linear-gradient(180deg, rgba(255, 132, 36, 0.08) 0%, var(--color-surface) 45%);
      }
    }

    .badge {
      position: absolute;
      top: -13px;
      right: 1.25rem;
      background-color: var(--color-primary);
      color: #080808;
      font-family: var(--font-heading);
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      white-space: nowrap;
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }

    .plan-desc {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
      min-height: 3.1rem;
    }

    .price-box {
      margin: 1.25rem 0;
      padding: 1rem 0;
      border-top: 1px solid var(--color-surface-light);
      border-bottom: 1px solid var(--color-surface-light);
      white-space: nowrap;

      .price {
        font-family: var(--font-heading);
        font-size: 2.15rem;
        font-weight: 700;
        color: var(--color-primary);
      }

      .period {
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        margin-left: 0.2rem;
      }
    }

    .benefits {
      list-style: none;
      margin-bottom: 1.75rem;
      flex-grow: 1;
      display: grid;
      align-content: start;
      gap: 0.75rem;

      li {
        display: flex;
        align-items: flex-start;
        gap: 0.55rem;
        font-size: 0.9rem;
        color: var(--color-text-secondary);
      }

      .check {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  `]
})
export class PlansComponent {
  private readonly whatsappService = inject(WhatsappService);
  plans = PLANS_DATA;

  selectPlan(planName: string): void {
    this.whatsappService.openPlanInquiry(planName);
  }
}