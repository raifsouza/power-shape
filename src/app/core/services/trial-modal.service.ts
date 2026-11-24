import { inject, Injectable, signal } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Injectable({
  providedIn: 'root'
})
export class TrialModalService {
  readonly isOpen = signal(false);
  readonly preselectedModality = signal<string>('Musculação');
  private readonly analytics = inject(AnalyticsService);
      
  open(modality = 'Musculação'): void {
  this.preselectedModality.set(modality);
  this.isOpen.set(true);
  this.analytics.trackTrialModalOpen(modality);
}

  close(): void {
    this.isOpen.set(false);
  }
}