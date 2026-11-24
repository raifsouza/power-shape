import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);

  trackPlanClick(planName: string, price?: string): void {
    this.trackEvent('select_plan', {
      plan_name: planName,
      plan_price: price ?? '',
      channel: 'whatsapp'
    });

    if (isPlatformBrowser(this.platformId) && typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'SelectPlan', {
        plan_name: planName,
        plan_price: price ?? ''
      });
    }
  }

  trackTrialModalOpen(modality: string): void {
    this.trackEvent('open_trial_modal', { modality });
  }

  trackTrialBookingSubmitted(modality: string, scheduleSlot: string): void {
    this.trackEvent('generate_lead', {
      lead_type: 'trial_booking',
      modality,
      schedule_slot: scheduleSlot
    });

    if (isPlatformBrowser(this.platformId) && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: `Aula Experimental - ${modality}`,
        content_category: scheduleSlot
      });
    }
  }

  trackContactFormSubmitted(planName: string): void {
    this.trackEvent('generate_lead', {
      lead_type: 'contact_form',
      plan_name: planName
    });

    if (isPlatformBrowser(this.platformId) && typeof window.fbq === 'function') {
      window.fbq('track', 'Contact', {
        content_name: planName
      });
    }
  }

  private trackEvent(eventName: string, params: Record<string, string | number | boolean>): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }
}