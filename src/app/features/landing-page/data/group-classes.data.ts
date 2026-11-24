import { GroupClassItem } from '../../../shared/models/group-class.model';

export const GROUP_CLASSES_DATA: GroupClassItem[] = [
  {
    id: 'funcional',
    name: 'Funcional',
    description: 'Treinamento dinâmico para força, agilidade, resistência e condicionamento em grupo.',
    featured: true,
    schedules: [
      { days: 'Terça e Quinta-feira', time: '08h às 09h' },
      { days: 'Quarta-feira', time: '20h às 21h' }
    ]
  },
  {
    id: 'danca',
    name: 'Dança',
    description: 'Aulas animadas para gastar calorias, melhorar a coordenação e entrar no ritmo.',
    schedules: [
      { days: 'Terça e Quinta-feira', time: '20h às 21h' }
    ]
  },
  {
    id: 'jump',
    name: 'Jump',
    description: 'Exercícios de alta energia no mini-trampolim com foco em cardio e resistência.',
    schedules: [
      { days: 'Segunda e Sexta-feira', time: '20h às 21h' },
      { days: 'Quarta-feira', time: '08h às 09h' }
    ]
  },
  {
    id: 'ritbox',
    name: 'Ritbox',
    description: 'Combinação de golpes e ritmo musical para intensidade, coordenação e queima calórica.',
    schedules: [
      { days: 'Quarta-feira', time: '08h30' }
    ]
  }
];