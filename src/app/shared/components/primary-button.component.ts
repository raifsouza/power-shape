import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [class.outline]="variant === 'outline'"
      [class.full-width]="fullWidth"
      (click)="clicked.emit($event)"
      class="btn"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      gap: 0.5rem;
      padding: 0.9rem 1.75rem;
      font-family: var(--font-heading);
      font-size: 1.05rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #080808;
      background-color: var(--color-primary);
      border: 2px solid var(--color-primary);
      border-radius: var(--radius-default);
      cursor: pointer;
      transition: all var(--transition-default);

      &:hover:not(:disabled) {
        background-color: var(--color-primary-hover);
        border-color: var(--color-primary-hover);
        transform: translateY(-2px);
      }

      &:focus-visible {
        outline: 2px solid var(--color-text);
        outline-offset: 3px;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.outline {
        background-color: transparent;
        color: var(--color-text);
        border-color: var(--color-text);

        &:hover:not(:disabled) {
          background-color: var(--color-text);
          color: var(--color-background);
        }
      }

      &.full-width {
        width: 100%;
      }
    }
  `]
})
export class PrimaryButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'solid' | 'outline' = 'solid';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Output() clicked = new EventEmitter<MouseEvent>();
}