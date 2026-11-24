import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button.component';
import { GROUP_CLASSES_DATA } from '../../data/group-classes.data';
import { WhatsappService } from '../../../../core/services/whatsapp.service';
import { TrialModalService } from '../../../../core/services/trial-modal.service';

@Component({
  selector: 'app-group-classes',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, PrimaryButtonComponent],
  template: `
    <section id="aulas-coletivas" class="group-classes">
      <div class="container">
        <app-section-title
          eyebrow="Aulas Coletivas"
          title="Mais Movimento, Mais Saúde, Mais Resultado!"
          subtitle="Confira nossa grade de aulas funcionais e coletivas e garanta sua vaga na turma."
        ></app-section-title>

        <div class="classes-grid">
          <article
            class="class-card"
            *ngFor="let item of classes"
            [class.featured]="item.featured"
          >
            <div class="card-header">
              <h3>{{ item.name }}</h3>
              <span class="instructor" *ngIf="item.instructor">{{ item.instructor }}</span>
            </div>

            <p class="class-desc">{{ item.description }}</p>

            <ul class="schedule-list">
              <li *ngFor="let slot of item.schedules">
                <span class="days">{{ slot.days }}</span>
                <strong class="time">{{ slot.time }}</strong>
              </li>
            </ul>

            <app-primary-button
              [variant]="item.featured ? 'solid' : 'outline'"
              [fullWidth]="true"
              (clicked)="askAboutClass(item.name)"
            >
              Consultar Vaga
            </app-primary-button>
          </article>
        </div>

        <div class="pillars-bar">
          <div class="pillar">
            <strong>Treino de Qualidade</strong>
            <span>Metodologia dinâmica e acompanhamento</span>
          </div>
          <div class="pillar">
            <strong>Mais Saúde</strong>
            <span>Condicionamento, energia e bem-estar</span>
          </div>
          <div class="pillar">
            <strong>Ambiente Acolhedor</strong>
            <span>Turmas motivadoras para todos os níveis</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .classes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem;
      align-items: stretch;
    }

    .class-card {
      background-color: var(--color-surface);
      border: 1px solid var(--color-surface-light);
      border-radius: var(--radius-default);
      padding: 1.85rem 1.5rem;
      display: flex;
      flex-direction: column;
      transition: transform var(--transition-default), border-color var(--transition-default);

      &:hover {
        transform: translateY(-4px);
        border-color: var(--color-primary);
      }

      &.featured {
        border-color: rgba(255, 132, 36, 0.55);
      }
    }

    .card-header {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 0.75rem;

      h3 {
        font-size: 1.55rem;
        color: var(--color-primary);
      }

      .instructor {
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--color-text);
      }
    }

    .class-desc {
      color: var(--color-text-secondary);
      font-size: 0.92rem;
      margin-bottom: 1.25rem;
      min-height: 3.6rem;
    }

    .schedule-list {
      list-style: none;
      border-top: 1px solid var(--color-surface-light);
      border-bottom: 1px solid var(--color-surface-light);
      padding: 1rem 0;
      margin-bottom: 1.5rem;
      flex-grow: 1;
      display: grid;
      align-content: start;
      gap: 0.75rem;

      li {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
      }

      .days {
        font-family: var(--font-heading);
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-text-secondary);
      }

      .time {
        font-family: var(--font-heading);
        font-size: 1.1rem;
        color: var(--color-text);
      }
    }

    .pillars-bar {
      margin-top: 2.5rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
      background-color: var(--color-surface);
      border: 1px solid var(--color-surface-light);
      border-left: 4px solid var(--color-primary);
      border-radius: var(--radius-default);
      padding: 1.35rem 1.5rem;

      .pillar {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        strong {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          text-transform: uppercase;
          color: var(--color-primary);
        }

        span {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
        }
      }
    }

    @media (max-width: 820px) {
      .pillars-bar {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class GroupClassesComponent {

  private readonly trialModal = inject(TrialModalService);
  classes = GROUP_CLASSES_DATA;
  
  askAboutClass(className: string): void {
  this.trialModal.open(className);
  }
}