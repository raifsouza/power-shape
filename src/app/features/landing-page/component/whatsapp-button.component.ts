import { Component, inject } from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  template: `
    <button
      type="button"
      class="whatsapp-float"
      aria-label="Falar com a Power Shape no WhatsApp"
      (click)="openChat()"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.758.457 3.473 1.328 4.988L2 22l5.188-1.359a9.923 9.923 0 0 0 4.843 1.258h.004c5.515 0 9.969-4.454 9.969-9.969A9.914 9.914 0 0 0 19.086 4.91 9.908 9.908 0 0 0 12.031 2zm5.82 14.273c-.246.691-1.43 1.324-1.984 1.406-.508.074-1.152.106-1.859-.117-.43-.137-.98-.32-1.688-.625-2.968-1.281-4.906-4.269-5.054-4.469-.149-.199-1.207-1.605-1.207-3.062 0-1.457.762-2.172 1.031-2.469.27-.297.59-.371.785-.371.196 0 .391.004.563.012.18.008.422-.07.66.504.246.594.836 2.039.91 2.187.074.149.125.321.024.52-.098.199-.149.32-.297.492-.148.172-.312.383-.445.516-.149.148-.305.308-.133.605.172.297.766 1.262 1.645 2.043 1.132 1.008 2.086 1.32 2.383 1.469.296.148.468.125.64-.074.172-.199.738-.859.934-1.156.195-.297.394-.246.664-.148.27.097 1.718.808 2.015.957.297.148.492.222.567.347.074.125.074.719-.172 1.41z"/>
      </svg>
    </button>
  `,
  styles: [`
    .whatsapp-float {
      position: fixed;
      right: 1.25rem;
      bottom: 1.25rem;
      z-index: 950;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      background-color: #25D366;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
      cursor: pointer;
      transition: transform var(--transition-default);

      &:hover {
        transform: scale(1.08);
      }

      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 3px;
      }
    }
  `]
})
export class WhatsappButtonComponent {
  private readonly whatsappService = inject(WhatsappService);

  openChat(): void {
    this.whatsappService.openGeneralContact();
  }
}