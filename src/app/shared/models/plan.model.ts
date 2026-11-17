export interface Plan {
  id: string;
  name: string;
  price: string;
  periodicity: string;
  description?: string;
  benefits: string[];
  highlighted?: boolean;
  badgeText?: string;
}