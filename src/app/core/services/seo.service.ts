import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SITE_CONFIG } from '../config/site-config';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);

  configureLandingPageSeo(canonicalUrl = 'https://academiapowershape.com.br/'): void {
    const title = `${SITE_CONFIG.academyName} | Musculação, Aulas Coletivas e Performance`;
    const description =
      'Treine na Power Shape Academia: musculação, aulas coletivas, planos flexíveis e aula experimental gratuita. Estrutura completa e acompanhamento profissional.';

    this.titleService.setTitle(title);

    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'academia, musculação, aulas coletivas, funcional, ritbox, jump, dança, aula experimental, planos de academia, power shape'
    });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });

    // Open Graph (WhatsApp / Instagram / Facebook)
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:locale', content: 'pt_BR' });
    this.metaService.updateTag({ property: 'og:site_name', content: SITE_CONFIG.academyName });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://academiapowershape.com.br/images/ambiente-1.jpg'
    });

    this.setCanonicalLink(canonicalUrl);
    this.injectLocalBusinessSchema(canonicalUrl, description);
  }

  private setCanonicalLink(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private injectLocalBusinessSchema(url: string, description: string): void {
    const scriptId = 'power-shape-jsonld';
    let script = this.document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'HealthClub',
      name: SITE_CONFIG.academyName,
      description,
      url,
      telephone: `+${SITE_CONFIG.whatsappNumber}`,
      foundingDate: `${SITE_CONFIG.foundedYear}`,
      sameAs: [SITE_CONFIG.instagramUrl],
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        addressRegion: SITE_CONFIG.address.state,
        postalCode: SITE_CONFIG.address.zipCode,
        addressCountry: 'BR'
      }
    };

    script.textContent = JSON.stringify(schema);
  }
}