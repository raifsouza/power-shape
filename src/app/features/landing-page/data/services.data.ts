import { ServiceItem } from '../../../shared/models/service.model';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'musculacao',
    title: 'Musculação & Bodybuilding',
    description: 'Equipamentos biomecânicos de alta performance e pesos livres para hipertrofia e força.',
    icon: 'dumbbell'
  },
  {
    id: 'cardio',
    title: 'Área Cardio Completa',
    description: 'Esteiras, bicicletas e elípticos modernos para condicionamento físico e resistência.',
    icon: 'heart-pulse'
  },
  {
    id: 'acompanhamento',
    title: 'Acompanhamento Técnico',
    description: 'Profissionais capacitados em salão para montagem de fichas e correção postural.',
    icon: 'clipboard-check'
  },
  {
    id: 'avaliacao',
    title: 'Avaliação Física',
    description: 'Acompanhamento de medidas, composição corporal e evolução periódica.',
    icon: 'activity'
  }
  
];