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
  rating?: number;
  userRatingCount?: number;
  reviews?: GooglePlaceReview[];
}

export interface GoogleReviewsSummary {
  rating?: number;
  userRatingCount?: number;
  testimonials: Testimonial[];
}

@Injectable({
  providedIn: 'root'
})
export class GoogleReviewsService {
  private readonly http = inject(HttpClient);

  getTopReviews(): Observable<GoogleReviewsSummary> {
    const { placeId, apiKey } = SITE_CONFIG.googleReviews;

    if (!placeId || !apiKey || placeId === 'ChIJYzl-f_iLpJIRkVOk-C_BPS4') {
      return of({ testimonials: TESTIMONIALS_DATA });
    }

    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=pt-BR`;
    const headers = new HttpHeaders({
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'rating,userRatingCount,reviews'
    });

    return this.http.get<PlaceDetailsResponse>(url, { headers }).pipe(
      
      map(response => {
        console.log('Reviews retornadas pela API:', response.reviews);
        console.log('Resposta completa:', response);
        const filtered = (response.reviews ?? [])
          .filter(review => review.rating >= 4 && !!review.text?.text?.trim())
          .map((review, index): Testimonial & { rating?: number } => ({
            id: `google-${index}`,
            studentName: review.authorAttribution?.displayName ?? 'Aluno Power Shape',
            text: review.text!.text.trim(),
            avatarUrl: review.authorAttribution?.photoUri,
            resultTimeframe: review.relativePublishTimeDescription ?? 'Avaliação no Google',
            rating: review.rating
          }));
          console.log('Reviews após filtro >= 4:', filtered);
        return {
          rating: response.rating,
          userRatingCount: response.userRatingCount,
          testimonials: filtered.length > 0 ? filtered : TESTIMONIALS_DATA
        };
      }),
      catchError(() => of({ testimonials: TESTIMONIALS_DATA }))
    );
  }
}