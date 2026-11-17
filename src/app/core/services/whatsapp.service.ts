import { Injectable } from '@angular/core';
import { SITE_CONFIG } from '../config/site-config';

export interface InterestFormPayload {
  name: string;
  phone: string;
  planName: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  private readonly baseUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;

  buildUrl(message: string): string {
    return `${this.baseUrl}?text=${encodeURIComponent(message)}`;
  }

  openGeneralContact(): void {
    window.open(this.buildUrl(SITE_CONFIG.defaultWhatsappMessage), '_blank', 'noopener,noreferrer');
  }

  openPlanInquiry(planName: string): void {
    const message = `Olá! Tenho interesse no plano *${planName}* da Power Shape. Poderiam me enviar mais informações?`;
    window.open(this.buildUrl(message), '_blank', 'noopener,noreferrer');
  }

  openFormSubmission(payload: InterestFormPayload): void {
    const lines = [
      `Olá! Gostaria de solicitar informações de matrícula na *Power Shape Academia*.`,
      ``,
      `*Nome:* ${payload.name}`,
      `*Telefone:* ${payload.phone}`,
      `*Plano de interesse:* ${payload.planName}`
    ];

    if (payload.message?.trim()) {
      lines.push(`*Observação:* ${payload.message.trim()}`);
    }

    window.open(this.buildUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
  }
}