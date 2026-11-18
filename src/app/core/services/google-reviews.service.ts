import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { SITE_CONFIG } from '../config/site-config';
import { Testimonial } from '../../shared/models/testimonial.model';
import { TESTIMONIALS_DATA } from '../../features/landing-page/data/testimonials.data';

interface GooglePlaceReview {
  rating: number;
  text?: { text: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: {
    displayName: string;
    photoUri?: string;
  };
}

interface PlaceDetailsResponse {
  reviews?: GooglePlaceReview[];
}

@Injectable({
  providedIn: 'root'
})
export class GoogleReviewsService {
  private readonly http = inject(HttpClient);

  getTopReviews(): Observable<Testimonial[]> {
    const { placeId, apiKey } = SITE_CONFIG.googleReviews;
    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=pt-BR`;

    console.log('1. URL montada:', url);

    const headers = new HttpHeaders({
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'reviews'
    });

    console.log('2. Disparando HTTP GET agora...');

    return this.http.get<PlaceDetailsResponse>(url, { headers }).pipe(
      map(response => {
        console.log('3. Resposta recebida do Google:', response);
        const filtered = (response.reviews ?? [])
          .filter(review => review.rating >= 4 && !!review.text?.text)
          .map((review, index): Testimonial & { rating?: number } => ({
            id: `google-${index}`,
            studentName: review.authorAttribution?.displayName ?? 'Aluno Power Shape',
            text: review.text!.text,
            avatarUrl: review.authorAttribution?.photoUri,
            resultTimeframe: review.relativePublishTimeDescription ?? 'Avaliação no Google',
            rating: review.rating
          }));

        return filtered.length > 0 ? filtered : TESTIMONIALS_DATA;
      }),
      catchError((err) => {
        console.error('4. Erro na chamada HTTP:', err);
        return of(TESTIMONIALS_DATA);
      })
    );
  }
}