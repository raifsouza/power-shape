import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../../../core/config/site-config';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <img src="/icons/logotransparente.png" alt="Power Shape Academia" />
          <p>
            {{ config.academyName }} • Desde {{ config.foundedYear }}.<br />
            Musculação, performance e acompanhamento focado nos seus resultados.
          </p>
        </div>

        <div class="footer-links">
          <h4>Navegação</h4>
          <a href="#inicio">Início</a>
          <a href="#sobre">Academia</a>
          <a href="#estrutura">Estrutura</a>
          <a href="#resultados">Resultados</a>
          <a href="#servicos">Serviços</a>
          <a href="#planos">Planos</a>
        </div>

        <div class="footer-contact">
          <h4>Contato</h4>
          <p>{{ config.address.street }} - {{ config.address.city }}/{{ config.address.state }}</p>
          <p>WhatsApp: {{ config.phoneDisplay }}</p>
          <a [href]="config.instagramUrl" target="_blank" rel="noopener noreferrer">
            Instagram: {{ config.instagramHandle }}
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container">
          <p>© {{ currentYear }} {{ config.academyName }}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #040404;
      border-top: 1px solid var(--color-surface-light);
      padding-top: 4rem;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1fr;
      gap: 2.5rem;
      padding-bottom: 3rem;
    }

    .footer-brand {
      img {
        height: 64px;
        margin-bottom: 1rem;
      }

      p {
        color: var(--color-text-secondary);
        font-size: 0.92rem;
        max-width: 340px;
      }
    }

    h4 {
      font-size: 1.1rem;
      color: var(--color-primary);
      margin-bottom: 1rem;
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      a {
        color: var(--color-text-secondary);
        font-size: 0.92rem;
        transition: color var(--transition-default);

        &:hover {
          color: var(--color-primary);
        }
      }
    }

    .footer-contact {
      p, a {
        color: var(--color-text-secondary);
        font-size: 0.92rem;
        margin-bottom: 0.5rem;
        display: block;
      }

      a:hover {
        color: var(--color-primary);
      }
    }

    .footer-bottom {
      border-top: 1px solid var(--color-surface);
      padding: 1.25rem 0;
      text-align: center;
      color: var(--color-text-secondary);
      font-size: 0.85rem;
    }

    @media (max-width: 768px) {
      .footer-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {
  config = SITE_CONFIG;
  currentYear = new Date().getFullYear();
}