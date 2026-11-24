import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrialModalService } from '../../../../core/services/trial-modal.service';
import { WhatsappService } from '../../../../core/services/whatsapp.service';
import { GROUP_CLASSES_DATA } from '../../data/group-classes.data';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button.component';
import { AnalyticsService } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-trial-booking-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimaryButtonComponent],
  template: `
    <div class="modal-backdrop" *ngIf="modalService.isOpen()" (click)="modalService.close()">
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <div class="header-text">
            <span class="eyebrow">Aula Experimental Gratuita</span>
            <h3 id="modal-title">Agende Seu Treino</h3>
          </div>

          <button
            type="button"
            class="close-btn"
            aria-label="Fechar janela"
            (click)="modalService.close()"
          >
            ✕
          </button>
        </div>

        <p class="subtitle">
          Escolha a modalidade e o melhor horário. Enviaremos sua ficha direto para confirmar sua vaga.
        </p>

        <form (ngSubmit)="submitBooking()" #bookingForm="ngForm" class="booking-form">
          <div class="form-group">
            <label for="studentName">Seu Nome *</label>
            <input
              id="studentName"
              name="studentName"
              type="text"
              required
              placeholder="Ex: João Silva"
              [(ngModel)]="studentName"
            />
          </div>

          <div class="form-group">
            <label for="studentPhone">Seu WhatsApp *</label>
            <input
              id="studentPhone"
              name="studentPhone"
              type="tel"
              required
              placeholder="Ex: (91) 98888-7777"
              [(ngModel)]="studentPhone"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="modality">Modalidade *</label>
              <select
                id="modality"
                name="modality"
                [ngModel]="selectedModality()"
                (ngModelChange)="onModalityChange($event)"
              >
                <option *ngFor="let mod of modalities" [value]="mod">
                  {{ mod }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="scheduleSlot">Dia e Horário *</label>
              <select
                id="scheduleSlot"
                name="scheduleSlot"
                [(ngModel)]="selectedSlot"
                required
              >
                <option *ngFor="let slot of availableSlots()" [value]="slot">
                  {{ slot }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="goal">Objetivo Principal (opcional)</label>
            <select id="goal" name="goal" [(ngModel)]="goal">
              <option value="">Selecione um objetivo...</option>
              <option value="Hipertrofia / Ganho de massa">Hipertrofia / Ganho de massa</option>
              <option value="Emagrecimento e condicionamento">Emagrecimento e condicionamento</option>
              <option value="Saúde e qualidade de vida">Saúde e qualidade de vida</option>
              <option value="Conhecer a estrutura da academia">Conhecer a estrutura da academia</option>
            </select>
          </div>

          <p class="error-msg" *ngIf="errorMessage()">{{ errorMessage() }}</p>

          <div class="submit-wrapper">
            <app-primary-button
              type="submit"
              variant="solid"
              [fullWidth]="true"
            >
              Confirmar Agendamento no WhatsApp
            </app-primary-button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    :host *,
    :host *::before,
    :host *::after {
      box-sizing: border-box;
    }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      overflow-y: auto;
    }

    .modal-card {
      position: relative;
      width: 100%;
      max-width: 480px;
      max-height: calc(100dvh - 2rem);
      overflow-y: auto;
      background-color: var(--color-surface);
      border: 1px solid var(--color-surface-light);
      border-top: 4px solid var(--color-primary);
      border-radius: 12px;
      padding: 1.75rem;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8);
    }

    .modal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 0.45rem;
    }

    .header-text {
      min-width: 0;
    }

    .close-btn {
      flex-shrink: 0;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--color-surface-light);
      color: var(--color-text-secondary);
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      font-size: 0.95rem;
      cursor: pointer;
      display: grid;
      place-items: center;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--color-primary);
        color: var(--color-primary);
        background: rgba(255, 132, 36, 0.1);
      }
    }

    .eyebrow {
      display: block;
      font-family: var(--font-heading);
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-primary);
      margin-bottom: 0.25rem;
    }

    h3 {
      font-size: 1.65rem;
      line-height: 1.15;
      margin: 0;
      color: var(--color-text);
    }

    .subtitle {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
      line-height: 1.45;
      margin: 0 0 1.4rem;
    }

    .booking-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.85rem;
      width: 100%;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      width: 100%;
      min-width: 0;

      label {
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--color-text);
      }

      input,
      select {
        display: block;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        height: 46px;
        padding: 0 0.9rem;
        background-color: #080808;
        border: 1px solid var(--color-surface-light);
        border-radius: 8px;
        color: var(--color-text);
        font-family: inherit;
        font-size: 0.94rem;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;

        &::placeholder {
          color: #6f6f6f;
        }

        &:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(255, 132, 36, 0.16);
        }
      }

      select {
        appearance: none;
        padding-right: 2.25rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23FF8424' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.85rem center;
        background-size: 14px;
      }
    }

    .error-msg {
      color: #ff6b6b;
      font-size: 0.84rem;
      margin: 0;
    }

    .submit-wrapper {
      width: 100%;
      margin-top: 0.35rem;

      app-primary-button,
      ::ng-deep button {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        white-space: normal;
        line-height: 1.25;
      }
    }

    @media (max-width: 540px) {
      .modal-backdrop {
        align-items: flex-end;
        padding: 0;
      }

      .modal-card {
        max-width: 100%;
        max-height: 92dvh;
        border-radius: 16px 16px 0 0;
        border-left: none;
        border-right: none;
        border-bottom: none;
        padding: 1.4rem 1.2rem 1.75rem;
      }

      h3 {
        font-size: 1.4rem;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 0.9rem;
      }

      .form-group input,
      .form-group select {
        font-size: 16px; /* evita zoom automático no iOS Safari */
      }
    }
  `]
})
export class TrialBookingModalComponent {
  readonly modalService = inject(TrialModalService);
  private readonly whatsappService = inject(WhatsappService);
  private readonly analytics = inject(AnalyticsService);

  readonly modalities = [
    'Musculação',
    ...GROUP_CLASSES_DATA.map(c => c.name)
  ];

  studentName = '';
  studentPhone = '';
  selectedModality = signal<string>('Musculação');
  selectedSlot = '';
  goal = '';
  errorMessage = signal<string>('');

  readonly availableSlots = computed<string[]>(() => {
    const current = this.selectedModality();
    if (current === 'Musculação') {
      return [
        'Manhã (06h às 12h)',
        'Tarde (12h às 18h)',
        'Noite (18h às 22h)'
      ];
    }

    const groupClass = GROUP_CLASSES_DATA.find(c => c.name === current);
    return groupClass
      ? groupClass.schedules.map(s => `${s.days} - ${s.time}`)
      : ['Horário a combinar'];
  });

  constructor() {
    effect(() => {
      const preselected = this.modalService.preselectedModality();
      this.selectedModality.set(preselected);
      const slots = this.availableSlots();
      this.selectedSlot = slots[0] ?? '';
      this.errorMessage.set('');
    });
  }

  onModalityChange(modality: string): void {
    this.selectedModality.set(modality);
    const slots = this.availableSlots();
    this.selectedSlot = slots[0] ?? '';
  }

  submitBooking(): void {
    this.analytics.trackTrialBookingSubmitted(
    this.selectedModality(),
    this.selectedSlot
    );
    if (!this.studentName.trim() || !this.studentPhone.trim()) {
      this.errorMessage.set('Por favor, preencha seu nome e WhatsApp para continuar.');
      return;
    }

    this.errorMessage.set('');
    this.whatsappService.openTrialBooking({
      studentName: this.studentName.trim(),
      studentPhone: this.studentPhone.trim(),
      modality: this.selectedModality(),
      scheduleSlot: this.selectedSlot,
      goal: this.goal || undefined
    });

    this.modalService.close();
  }
}