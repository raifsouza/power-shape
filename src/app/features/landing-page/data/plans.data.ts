import { Plan } from '../../../shared/models/plan.model';

export const PLANS_DATA: Plan[] = [
  {
    id: 'mensal',
    name: 'Plano Mensal',
    price: 'R$ 79,99',
    periodicity: '/mês',
    description: 'Ideal para quem busca flexibilidade sem fidelidade.',
    benefits: [
      'Acesso livre à musculação',
      'Avaliação física inicial',
      'Acompanhamento de instrutores no salão',
      'Sem taxa de cancelamento'
    ]
  },
  {
    id: 'amigos',
    name: 'Plano Amigos',
    price: 'R$ 69,90',
    periodicity: '/mês',
    description: 'O melhor Para treino com amigos (a partir de 3 matriculas)',
    benefits: [
      'Acesso livre à musculação',
      'Avaliação física inicial',
      'Acompanhamento de instrutores no salão',
      'Sem taxa de cancelamento'
    ]
  },
  {
    id: 'trimestral',
    name: 'Plano Trimestral',
    price: 'R$ 74,99',
    periodicity: '/mês',
    description: 'Compromisso ideal para consolidar sua rotina e resultados.',
    highlighted: true,
    badgeText: 'Mais Escolhido',
    benefits: [
      'Acesso ilimitado a todas as áreas',
      'Reavaliação física a cada 45 dias',
      'Treino personalizado atualizado',
      'Condição especial no pagamento trimestral'
    ]
  },
  {
    id: 'anual',
    name: 'Plano Anual',
    price: 'R$ 69,90',
    periodicity: '/mês',
    description: 'O melhor custo-benefício para transformação contínua.',
    benefits: [
      'Acesso total 7 dias por semana (horário de funcionamento)',
      'Avaliações físicas periódicas inclusas',
      'Isenção de taxa de matrícula',
      'Direito a 1 passe livre mensal para convidado'
    ]
  }
];