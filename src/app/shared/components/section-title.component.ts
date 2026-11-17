import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-header" [class.centered]="centered">
      <span *ngIf="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <h2>{{ title }}</h2>
      <p *ngIf="subtitle" class="subtitle">{{ subtitle }}</p>
      <div class="accent-bar"></div>
    </div>
  `,
  styles: [`
    .section-header {
      margin-bottom: 3rem;

      &.centered {
        text-align: center;
        .accent-bar {
          margin: 1rem auto 0;
        }
        .subtitle {
          margin-left: auto;
          margin-right: auto;
        }
      }
    }

    .eyebrow {
      display: block;
      font-family: var(--font-heading);
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--color-primary);
      margin-bottom: 0.4rem;
    }

    h2 {
      font-size: clamp(2rem, 4vw, 2.75rem);
      color: var(--color-text);
    }

    .subtitle {
      margin-top: 0.75rem;
      max-width: 620px;
      color: var(--color-text-secondary);
      font-size: 1.05rem;
    }

    .accent-bar {
      width: 60px;
      height: 4px;
      background-color: var(--color-primary);
      margin-top: 1rem;
      border-radius: 2px;
    }
  `]
})
export class SectionTitleComponent {
  @Input({ required: true }) title!: string;
  @Input() eyebrow?: string;
  @Input() subtitle?: string;
  @Input() centered = true;
}