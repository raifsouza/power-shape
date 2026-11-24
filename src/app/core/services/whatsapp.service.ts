import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SITE_CONFIG } from '../config/site-config';
import { TrialBookingPayload } from '../../shared/models/trial-booking.model';

export interface ContactFormSubmission {
  name: string;
  phone: string;
  planName: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly baseUrl = 'https://wa.me';

  openGeneralContact(customMessage?: string): void {
    const message = customMessage ?? SITE_CONFIG.defaultWhatsappMessage;
    this.openUrl(message);
  }

  openPlanInquiry(planName: string): void {
    const message = `Olá! Vim pelo site da Power Shape Academia e tenho interesse no *${planName}*. Gostaria de mais informações.`;
    this.openUrl(message);
  }

  openFormSubmission(data: ContactFormSubmission): void {
    const lines = [
      'Olá! Vim pelo site da *Power Shape Academia* e solicito atendimento:',
      '',
      `• *Nome:* ${data.name}`,
      `• *Telefone/WhatsApp:* ${data.phone}`,
      `• *Plano de interesse:* ${data.planName}`,
      data.message?.trim() ? `• *Mensagem:* ${data.message.trim()}` : ''
    ].filter(Boolean);

    this.openUrl(lines.join('\n'));
  }

  openTrialBooking(payload: TrialBookingPayload): void {
    const lines = [
      'Olá! Gostaria de agendar uma *Aula Experimental* na Power Shape Academia:',
      '',
      `• *Nome:* ${payload.studentName}`,
      `• *WhatsApp:* ${payload.studentPhone}`,
      `• *Modalidade:* ${payload.modality}`,
      `• *Dia/Horário:* ${payload.scheduleSlot}`,
      payload.goal ? `• *Objetivo:* ${payload.goal}` : ''
    ].filter(Boolean);

    this.openUrl(lines.join('\n'));
  }

  private openUrl(message: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const phone = SITE_CONFIG.whatsappNumber;
    const encoded = encodeURIComponent(message);
    window.open(`${this.baseUrl}/${phone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  }
}