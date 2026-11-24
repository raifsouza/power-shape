import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button.component';
import { SITE_CONFIG } from '../../../../core/config/site-config';
import { WhatsappService } from '../../../../core/services/whatsapp.service';
import { PLANS_DATA } from '../../data/plans.data';
import { AnalyticsService } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionTitleComponent, PrimaryButtonComponent],
  template: `
    <section id="contato" class="contact">
      <div class="container">
        <app-section-title
          eyebrow="Comece Agora"
          title="Fale Conosco e Faça Sua Matrícula"
          subtitle="Preencha seus dados para iniciar o atendimento direto no nosso WhatsApp oficial."
        ></app-section-title>

        <div class="contact-grid">
          <div class="info-column">
            <div class="info-card">
              <h3>Unidade & Horários</h3>

              <div class="info-block">
                <strong>Endereço</strong>
                <p>
                  {{ config.address.street }} - {{ config.address.neighborhood }}<br />
                  {{ config.address.city }}/{{ config.address.state }} • CEP {{ config.address.zipCode }}
                </p>
                <a [href]="config.address.googleMapsLink" target="_blank" rel="noopener noreferrer" class="map-link">
                  Abrir no Google Maps →
                </a>
              </div>

              <div class="info-block">
                <strong>Horário de Funcionamento</strong>
                <ul class="hours-list">
                  <li *ngFor="let item of config.businessHours">
                    <span>{{ item.days }}:</span>
                    <strong>{{ item.hours }}</strong>
                  </li>
                </ul>
              </div>

              <div class="info-block">
                <strong>Canais Diretos</strong>
                <p>WhatsApp: {{ config.phoneDisplay }}</p>
                <p>
                  Instagram:
                  <a [href]="config.instagramUrl" target="_blank" rel="noopener noreferrer">
                    {{ config.instagramHandle }}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <form [formGroup]="interestForm" (ngSubmit)="onSubmit()" class="form-card" novalidate>
            <h3>Solicitar Atendimento</h3>

            <div class="form-group">
              <label for="name">Nome completo *</label>
              <input
                id="name"
                type="text"
                formControlName="name"
                placeholder="Digite seu nome"
                [class.invalid]="isFieldInvalid('name')"
              />
              <small class="error-msg" *ngIf="isFieldInvalid('name')">
                Informe seu nome (mínimo 3 caracteres).
              </small>
            </div>

            <div class="form-group">
              <label for="phone">WhatsApp / Telefone *</label>
              <input
                id="phone"
                type="tel"
                formControlName="phone"
                placeholder="(91) 99999-9999"
                [class.invalid]="isFieldInvalid('phone')"
              />
              <small class="error-msg" *ngIf="isFieldInvalid('phone')">
                Informe um número de telefone válido com DDD.
              </small>
            </div>

            <div class="form-group">
              <label for="planName">Plano de interesse *</label>
              <select id="planName" formControlName="planName">
                <option *ngFor="let plan of plans" [value]="plan.name">
                  {{ plan.name }} ({{ plan.price }}{{ plan.periodicity }})
                </option>
                <option value="Ainda estou em dúvida">Ainda estou em dúvida / Quero conhecer</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">Mensagem (opcional)</label>
              <textarea
                id="message"
                rows="3"
                formControlName="message"
                placeholder="Ex: Gostaria de agendar uma aula experimental ou tirar dúvidas sobre horários."
              ></textarea>
            </div>

            <p class="lgpd-notice">
              Ao continuar, você será redirecionado ao WhatsApp oficial da Power Shape Academia com a
              mensagem preenchida. Seus dados não são armazenados em servidor por este formulário e são
              utilizados exclusivamente para o atendimento da sua solicitação.
            </p>

            <app-primary-button type="submit" [fullWidth]="true">
              Continuar no WhatsApp
            </app-primary-button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 2.5rem;
      align-items: start;
    }

    .info-card,
    .form-card {
      background-color: var(--color-surface);
      border: 1px solid var(--color-surface-light);
      border-radius: var(--radius-default);
      padding: 2rem;

      h3 {
        font-size: 1.45rem;
        margin-bottom: 1.5rem;
        color: var(--color-primary);
      }
    }

    .info-block {
      margin-bottom: 1.5rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--color-surface-light);

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      > strong {
        display: block;
        font-family: var(--font-heading);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 0.4rem;
      }

      p {
        color: var(--color-text-secondary);
        font-size: 0.95rem;
      }

      a {
        color: var(--color-primary);
        font-weight: 500;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .map-link {
      display: inline-block;
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }

    .hours-list {
      list-style: none;
      display: grid;
      gap: 0.35rem;
      font-size: 0.95rem;
      color: var(--color-text-secondary);

      li {
        display: flex;
        justify-content: space-between;
      }

      strong {
        color: var(--color-text);
      }
    }

    .form-group {
      margin-bottom: 1.25rem;

      label {
        display: block;
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 0.4rem;
      }

      input,
      select,
      textarea {
        width: 100%;
        padding: 0.8rem 0.95rem;
        background-color: var(--color-background);
        border: 1px solid var(--color-surface-light);
        border-radius: var(--radius-default);
        color: var(--color-text);
        font-family: var(--font-body);
        font-size: 0.95rem;

        &:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        &.invalid {
          border-color: var(--color-error);
        }
      }
    }

    .error-msg {
      display: block;
      margin-top: 0.3rem;
      color: var(--color-error);
      font-size: 0.82rem;
    }

    .lgpd-notice {
      font-size: 0.8rem;
      color: var(--color-text-secondary);
      margin-bottom: 1.25rem;
      line-height: 1.45;
    }

    @media (max-width: 900px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly whatsappService = inject(WhatsappService);
  private readonly analytics = inject(AnalyticsService);
  config = SITE_CONFIG;
  plans = PLANS_DATA;

  interestForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^[\d\s()+-]{10,16}$/)]],
    planName: [PLANS_DATA[1]?.name ?? 'Plano Mensal', [Validators.required]],
    message: ['']
  });

  isFieldInvalid(fieldName: 'name' | 'phone'): boolean {
    const control = this.interestForm.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {

    if (this.interestForm.invalid) {
      this.interestForm.markAllAsTouched();
      return;
    }
    const formValue = this.interestForm.getRawValue();
    this.analytics.trackContactFormSubmitted(formValue.planName);
    this.whatsappService.openFormSubmission(formValue);
  }
}