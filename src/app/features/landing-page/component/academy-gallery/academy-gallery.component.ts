import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';

interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
}

@Component({
  selector: 'app-academy-gallery',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section id="estrutura" class="gallery">
      <div class="container">
        <app-section-title
          eyebrow="Nossa Estrutura"
          title="Conheça o Espaço Power Shape"
          subtitle="Clique em qualquer foto para ampliar e conferir nossos ambientes e equipamentos."
        ></app-section-title>

        <div class="gallery-grid">
          <button
            type="button"
            class="gallery-item"
            *ngFor="let photo of photos; let i = index"
            (click)="openLightbox(i)"
            [attr.aria-label]="'Ampliar foto: ' + photo.caption"
          >
            <img [src]="photo.src" [alt]="photo.alt" loading="lazy" />
            <span class="caption">{{ photo.caption }}</span>
          </button>
        </div>
      </div>

      <div
        class="lightbox"
        *ngIf="selectedIndex() !== null"
        role="dialog"
        aria-modal="true"
        aria-label="Visualização ampliada da foto"
        (click)="closeLightbox()"
      >
        <div class="lightbox-content" (click)="$event.stopPropagation()">
          <button
            type="button"
            class="close-btn"
            aria-label="Fechar galeria"
            (click)="closeLightbox()"
          >
            ✕
          </button>

          <button
            type="button"
            class="nav-btn prev"
            aria-label="Foto anterior"
            (click)="prevPhoto()"
          >
            ‹
          </button>

          <figure *ngIf="currentPhoto as photo">
            <img [src]="photo.src" [alt]="photo.alt" />
            <figcaption>{{ photo.caption }}</figcaption>
          </figure>

          <button
            type="button"
            class="nav-btn next"
            aria-label="Próxima foto"
            (click)="nextPhoto()"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
    }

    .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-default);
      border: 1px solid var(--color-surface-light);
      background-color: var(--color-surface);
      padding: 0;
      cursor: pointer;
      text-align: left;

      img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        transition: transform var(--transition-default);
      }

      .caption {
        position: absolute;
        inset: auto 0 0 0;
        padding: 1.5rem 1rem 0.85rem;
        background: linear-gradient(to top, rgba(8, 8, 8, 0.92), transparent);
        color: var(--color-text);
        font-family: var(--font-heading);
        font-size: 0.95rem;
        letter-spacing: 0.04em;
      }

      &:hover img,
      &:focus-visible img {
        transform: scale(1.05);
      }

      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 3px;
      }
    }

    .lightbox {
      position: fixed;
      inset: 0;
      z-index: 2000;
      background-color: rgba(8, 8, 8, 0.94);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .lightbox-content {
      position: relative;
      max-width: 960px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      figure {
        margin: 0;
        text-align: center;

        img {
          max-height: 78vh;
          width: auto;
          margin: 0 auto;
          border-radius: var(--radius-default);
          border: 1px solid var(--color-surface-light);
        }

        figcaption {
          margin-top: 0.85rem;
          color: var(--color-text-secondary);
          font-family: var(--font-heading);
          font-size: 1.05rem;
        }
      }
    }

    .close-btn {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      background: var(--color-surface-light);
      color: var(--color-text);
      border: none;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      font-size: 1.2rem;
      cursor: pointer;

      &:hover {
        background-color: var(--color-primary);
        color: #080808;
      }
    }

    .nav-btn {
      background: rgba(23, 23, 23, 0.85);
      color: var(--color-text);
      border: 1px solid var(--color-surface-light);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      font-size: 1.75rem;
      line-height: 1;
      cursor: pointer;
      flex-shrink: 0;
      margin: 0 0.75rem;

      &:hover {
        background-color: var(--color-primary);
        color: #080808;
      }
    }
  `]
})
export class AcademyGalleryComponent {
  selectedIndex = signal<number | null>(null);

  photos: GalleryPhoto[] = [
    { src: '/images/pesosLivres.jpeg', alt: 'Área de musculação e pesos livres', caption: 'Área de Musculação & Pesos Livres' },
    { src: '/images/areadeSuperiores.jpeg', alt: 'Equipamentos articulados de alta carga', caption: 'Área de Musculação Superiores' },
    { src: '/images/areadeInferiores.jpeg', alt: 'Equipamentos articulados de alta carga', caption: 'Área de Musculação Inferiores' },
    { src: '/images/cardio.jpeg', alt: 'Área de equipamentos cardiovasculares', caption: 'Espaço Cardio' },
    { src: '/images/cardio2.jpeg', alt: 'Área de equipamentos cardiovasculares', caption: 'Espaço Cardio' },
    { src: '/images/salaoPrincipal.jpeg', alt: 'Visão geral do salão principal', caption: 'Salão Principal' }
  ];

  get currentPhoto(): GalleryPhoto | null {
    const idx = this.selectedIndex();
    return idx !== null ? this.photos[idx] : null;
  }

  openLightbox(index: number): void {
    this.selectedIndex.set(index);
  }

  closeLightbox(): void {
    this.selectedIndex.set(null);
  }

  nextPhoto(): void {
    const idx = this.selectedIndex();
    if (idx !== null) {
      this.selectedIndex.set((idx + 1) % this.photos.length);
    }
  }

  prevPhoto(): void {
    const idx = this.selectedIndex();
    if (idx !== null) {
      this.selectedIndex.set((idx - 1 + this.photos.length) % this.photos.length);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.selectedIndex() === null) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowRight') this.nextPhoto();
    if (event.key === 'ArrowLeft') this.prevPhoto();
  }
}