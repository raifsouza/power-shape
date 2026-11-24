import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button.component';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { TrialModalService } from '../../../core/services/trial-modal.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent],
  template: `
    <header class="header" [class.scrolled]="isScrolled()">
      <div class="container header-content">
        <a href="#inicio" class="brand" (click)="closeMenu()">
          <img src="/icons/logotransparente.png" alt="Power Shape Academia" />
          <span>POWER <strong>SHAPE</strong></span>
        </a>

        <nav class="nav" [class.open]="mobileMenuOpen()">
          <a *ngFor="let item of navItems" [href]="item.href" (click)="closeMenu()">
            {{ item.label }}
          </a>
          <div class="mobile-cta">
            <app-primary-button [fullWidth]="true" (clicked)="onEnrollClick()">
              Matricule-se
            </app-primary-button>
          </div>
        </nav>

        <div class="desktop-cta">
          <app-primary-button (clicked)="onEnrollClick()">
            Matricule-se
          </app-primary-button>
        </div>

        <button
          type="button"
          class="menu-toggle"
          [attr.aria-expanded]="mobileMenuOpen()"
          aria-label="Abrir ou fechar menu"
          (click)="toggleMenu()"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      padding: 1rem 0;
      background-color: rgba(8, 8, 8, 0.85);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid transparent;
      transition: all var(--transition-default);

      &.scrolled {
        padding: 0.65rem 0;
        background-color: rgba(8, 8, 8, 0.97);
        border-bottom-color: var(--color-surface-light);
      }
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      white-space: nowrap;
      font-family: var(--font-heading);
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: 0.05em;

      img {
        height: 44px;
        width: auto;
      }

      strong {
        color: var(--color-primary);
      }
    }

    .nav {
      display: flex;
      align-items: center;
      gap: 1.75rem;

      a {
        font-family: var(--font-heading);
        font-size: 0.95rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--color-text);
        transition: color var(--transition-default);

        &:hover {
          color: var(--color-primary);
        }
      }
    }

    .mobile-cta {
      display: none;
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.4rem;

      span {
        width: 26px;
        height: 2px;
        background-color: var(--color-text);
        transition: var(--transition-default);
      }
    }

    @media (max-width: 960px) {
      .desktop-cta {
        display: none;
      }

      .menu-toggle {
        display: flex;
      }

      .nav {
        position: fixed;
        top: 72px;
        left: 0;
        width: 100%;
        flex-direction: column;
        align-items: stretch;
        background-color: var(--color-surface);
        padding: 1.5rem;
        gap: 1rem;
        border-bottom: 1px solid var(--color-surface-light);
        transform: translateY(-120%);
        opacity: 0;
        pointer-events: none;
        transition: all var(--transition-default);

        &.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        a {
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--color-surface-light);
        }
      }

      .mobile-cta {
        display: block;
        margin-top: 0.5rem;
      }
    }
  `]
})
export class HeaderComponent {
  private readonly trialModal = inject(TrialModalService);
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);

  navItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Academia', href: '#sobre' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Planos', href: '#planos' },
    { label: 'Contato', href: '#contato' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 40);
  }

  toggleMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  onEnrollClick(): void {
    this.closeMenu();
    this.trialModal.open('Musculação')
  }
}