import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button.component';
import { PLANS_DATA } from '../../data/plans.data';
import { WhatsappService } from '../../../../core/services/whatsapp.service';
import { AnalyticsService } from '../../../../core/services/analytics.service';

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

            <p class="plan-observation" *ngIf="plan.observation">
              {{ plan.observation }}
            </p>

            <app-primary-button
              [variant]="plan.highlighted ? 'solid' : 'outline'"
              [fullWidth]="true"
              (clicked)="selectPlan(plan.name, plan.price)"
            >
              Quero Este Plano
            </app-primary-button>
          </article>
        </div>

        <div class="general-observations">
          <strong>Observações sobre os planos:</strong>
          <p>
            • Todos os planos dão direito ao uso livre da estrutura de musculação e cardio dentro do horário de funcionamento.<br />
            • Formas de pagamento aceitas: Pix, dinheiro, cartão de débito e crédito. Consulte condições de recorrência no WhatsApp.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .plans .container {
      max-width: 1280px;
    }

    .plans-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.35rem;
      align-items: stretch;
    }

    @media (max-width: 960px) {
      .plans-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.25rem;
      }
    }

    @media (max-width: 600px) {
      .plans-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 540px) {
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
      padding: 1.85rem 1.05rem;

      &.highlighted {
        border: 2px solid var(--color-primary);
        background: linear-gradient(180deg, rgba(255, 132, 36, 0.08) 0%, var(--color-surface) 45%);
      }
    }

    .badge {
      position: absolute;
      top: -12px;
      right: 0.75rem;
      background-color: var(--color-primary);
      color: #080808;
      font-family: var(--font-heading);
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      white-space: nowrap;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      min-height: 2.8rem;
      display: flex;
      align-items: center;
    }

    .plan-desc {
      color: var(--color-text-secondary);
      font-size: 0.84rem;
      line-height: 1.45;
      min-height: 3.7rem;
    }

    .price-box {
      margin: 1rem 0;
      padding: 0.85rem 0;
      border-top: 1px solid var(--color-surface-light);
      border-bottom: 1px solid var(--color-surface-light);
      white-space: nowrap;

      .price {
        font-family: var(--font-heading);
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--color-primary);
      }

      .period {
        color: var(--color-text-secondary);
        font-size: 0.82rem;
        margin-left: 0.15rem;
      }
    }

    .benefits {
      list-style: none;
      margin-bottom: 1.15rem;
      flex-grow: 1;
      display: grid;
      align-content: start;
      gap: 0.6rem;

      li {
        display: flex;
        align-items: flex-start;
        gap: 0.45rem;
        font-size: 0.84rem;
        line-height: 1.4;
        color: var(--color-text-secondary);
      }

      .check {
        color: var(--color-primary);
        font-weight: 700;
      }
    }

    .plan-observation {
      font-size: 0.75rem;
      color: var(--color-text-secondary);
      background-color: rgba(255, 255, 255, 0.03);
      border-left: 2px solid var(--color-primary);
      padding: 0.45rem 0.55rem;
      margin-bottom: 1.15rem;
      border-radius: 0 4px 4px 0;
      line-height: 1.35;
    }

    .general-observations {
      margin-top: 2.5rem;
      padding: 1.25rem 1.5rem;
      background-color: var(--color-surface);
      border: 1px solid var(--color-surface-light);
      border-left: 4px solid var(--color-primary);
      border-radius: var(--radius-default);

      strong {
        display: block;
        font-family: var(--font-heading);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--color-primary);
        margin-bottom: 0.4rem;
      }

      p {
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        line-height: 1.6;
      }
    }
  `]
})
export class PlansComponent {
  private readonly whatsappService = inject(WhatsappService);
  private readonly analytics = inject(AnalyticsService);
  plans = PLANS_DATA;

  selectPlan(planName: string, PlanPrice: string): void {
    this.analytics.trackPlanClick(planName, PlanPrice);
    this.whatsappService.openPlanInquiry(planName);
    this.whatsappService.openPlanInquiry(planName);
  }
}