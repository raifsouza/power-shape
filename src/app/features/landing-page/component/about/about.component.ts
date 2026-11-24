import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section id="sobre" class="about">
      <div class="container about-grid">
        <div class="about-media">
          <div
            class="gallery-frame"
            (touchstart)="onTouchStart($event)"
            (touchend)="onTouchEnd($event)"
          >
            <img
              [src]="currentImage().src"
              [alt]="currentImage().alt"
              loading="lazy"
            />

            <div class="gallery-overlay" *ngIf="currentImage().caption">
              <span>{{ currentImage().caption }}</span>
            </div>

            <span class="gallery-counter">
              {{ currentIndex() + 1 }} / {{ galleryImages.length }}
            </span>

            <button
              type="button"
              class="nav-btn prev"
              aria-label="Imagem anterior"
              (click)="prevImage()"
            >
              ‹
            </button>

            <button
              type="button"
              class="nav-btn next"
              aria-label="Próxima imagem"
              (click)="nextImage()"
            >
              ›
            </button>
          </div>

          <div class="gallery-thumbs" *ngIf="galleryImages.length > 1">
            <button
              type="button"
              class="thumb-btn"
              *ngFor="let img of galleryImages; let i = index"
              [class.active]="i === currentIndex()"
              [attr.aria-label]="'Ver foto ' + (i + 1)"
              (click)="selectImage(i)"
            >
              <img [src]="img.src" [alt]="img.alt" loading="lazy" />
            </button>
          </div>

          <div class="experience-badge">
            <strong>ESTD 2022</strong>
            <span>Foco em Performance</span>
          </div>
        </div>

        <div class="about-content">
          <app-section-title
            eyebrow="Sobre a Power Shape"
            title="Mais que uma academia, um ambiente de superação"
            [centered]="false"
          ></app-section-title>

          <p>
            Fundada em 2022, a <strong>Power Shape Academia</strong> nasceu com o propósito de oferecer um espaço dedicado ao treinamento,
            à saúde e à superação de objetivos. A academia reúne musculação e atividades coletivas em um ambiente que busca valorizar
            a orientação profissional, a organização e a convivência entre os alunos. Mais do que um local para treinar,
            a Power Shape quer construir uma comunidade ativa, motivada e comprometida com a evolução contínua.
          </p>
          <p>
            Aqui você encontra um ambiente motivador, organizado e preparado tanto para iniciantes
            quanto para praticantes avançados de bodybuilding.
          </p>

          <ul class="highlights">
            <li *ngFor="let item of highlights">
              <span class="dot"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      background-color: var(--color-surface);
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5rem;
      align-items: center;
    }

    .about-media {
      position: relative;
      padding-bottom: 1rem;
    }

    .gallery-frame {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-default);
      border: 1px solid var(--color-surface-light);
      background-color: #080808;

      img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        display: block;
        transition: opacity 0.25s ease;
      }
    }

    .gallery-counter {
      position: absolute;
      top: 0.85rem;
      right: 0.85rem;
      background-color: rgba(8, 8, 8, 0.78);
      color: var(--color-text);
      border: 1px solid rgba(255, 255, 255, 0.14);
      font-family: var(--font-heading);
      font-size: 0.78rem;
      letter-spacing: 0.06em;
      padding: 0.25rem 0.6rem;
      border-radius: 4px;
    }

    .gallery-overlay {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 2rem 1rem 0.85rem;
      background: linear-gradient(180deg, transparent 0%, rgba(8, 8, 8, 0.88) 100%);
      color: var(--color-text);
      font-size: 0.88rem;
      font-weight: 500;
    }

    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background-color: rgba(8, 8, 8, 0.78);
      color: var(--color-text);
      font-size: 1.5rem;
      line-height: 1;
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;

      &:hover {
        background-color: var(--color-primary);
        border-color: var(--color-primary);
        color: #080808;
      }

      &.prev {
        left: 0.75rem;
      }

      &.next {
        right: 0.75rem;
      }
    }

    .gallery-thumbs {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
      gap: 0.5rem;
      margin-top: 0.65rem;
      padding-right: 11rem; /* reserva espaço para o selo ESTD 2022 */
    }

    .thumb-btn {
      padding: 0;
      border: 2px solid transparent;
      border-radius: 6px;
      overflow: hidden;
      background: #080808;
      cursor: pointer;
      opacity: 0.55;
      transition: opacity 0.2s ease, border-color 0.2s ease;

      img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        display: block;
      }

      &:hover {
        opacity: 0.85;
      }

      &.active {
        opacity: 1;
        border-color: var(--color-primary);
      }
    }

    .experience-badge {
      position: absolute;
      bottom: -0.35rem;
      right: 0.75rem;
      background-color: var(--color-primary);
      color: #080808;
      padding: 0.85rem 1.25rem;
      border-radius: var(--radius-default);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);

      strong {
        display: block;
        font-family: var(--font-heading);
        font-size: 1.35rem;
        line-height: 1.1;
      }

      span {
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: uppercase;
      }
    }

    .about-content p {
      color: var(--color-text-secondary);
      margin-bottom: 1.25rem;
    }

    .highlights {
      list-style: none;
      margin-top: 1.75rem;
      display: grid;
      gap: 0.85rem;

      li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--color-primary);
        flex-shrink: 0;
      }
    }

    @media (max-width: 900px) {
      .about-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }

    @media (max-width: 520px) {
      .gallery-thumbs {
        padding-right: 0;
        margin-bottom: 3.25rem;
      }
    }
  `]
})
export class AboutComponent {
  // Adicione ou altere aqui os caminhos das fotos salvas na pasta public/images/
  galleryImages: GalleryImage[] = [
    {
      src: '/images/ambiente-1.jpeg',
      alt: 'Área de musculação da Power Shape Academia',
      caption: 'Área completa de musculação de Inferiores'
    },
    {
      src: '/images/ambiente-2.jpeg',
      alt: 'Equipamentos de treino da Power Shape Academia',
      caption: 'Ambiete tranquilo e sempre organizado'
    },
    {
      src: '/images/ambiente-3.jpeg',
      alt: 'Espaço de aulas coletivas e funcional',
      caption: 'Área completa de musculação de Superiores'
    },
    // {
    //   src: '/images/ambiente-4.jpg',
    //   alt: 'Estrutura interna da Power Shape Academia',
    //   caption: 'Ambiente organizado e preparado para sua evolução'
    // }
  ];

  currentIndex = signal(0);
  currentImage = computed(() => this.galleryImages[this.currentIndex()]);

  private touchStartX = 0;

  highlights = [
    'Equipamentos modernos e biomecânica precisa',
    'Acompanhamento próximo de profissionais qualificados',
    'Ambiente limpo e organizado',
    'Estrutura pensada para treinos de força e hipertrofia'
  ];

  prevImage(): void {
    const total = this.galleryImages.length;
    this.currentIndex.update(i => (i - 1 + total) % total);
  }

  nextImage(): void {
    const total = this.galleryImages.length;
    this.currentIndex.update(i => (i + 1) % total);
  }

  selectImage(index: number): void {
    this.currentIndex.set(index);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0]?.screenX ?? 0;
  }

  onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0]?.screenX ?? 0;
    const diff = this.touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? this.nextImage() : this.prevImage();
    }
  }
}