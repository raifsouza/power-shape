import { Plan } from '../../../shared/models/plan.model';

export const PLANS_DATA: Plan[] = [
  {
    id: 'diario',
    name: 'Diária (Esquenta)',
    price: 'R$ 9,99',
    periodicity: '/dia',
    description: 'Ideal para quem quer treinar avulso ou conhecer nossa estrutura na prática.',
    benefits: [
      'Acesso completo à musculação e cardio',
      'Válido por 1 dia de treino',
      'Sem vínculo ou mensalidade',
      'Suporte dos instrutores no salão'
    ],
    observation: '* Válido para 1 acesso único no dia da contratação.'
  },
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
    ],
    observation: '* Renovação mensal sem multa de cancelamento.'
  },
  {
    id: 'amigos',
    name: 'Plano Amigos',
    price: 'R$ 69,90',
    periodicity: '/mês',
    description: 'O melhor para treino com amigos (a partir de 3 matrículas).',
    benefits: [
      'Acesso livre à musculação',
      'Avaliação física inicial',
      'Acompanhamento de instrutores no salão',
      'Desconto especial por aluno no grupo'
    ],
    observation: '* Condição válida mediante matrícula simultânea de 3 ou mais pessoas.'
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
    ],
    observation: '* Valor equivalente mensal no pacote de 3 meses.'
  },
  {
    id: 'anual',
    name: 'Plano Anual',
    price: 'R$ 69,90',
    periodicity: '/mês',
    description: 'O melhor custo-benefício para transformação contínua.',
    benefits: [
      'Acesso total nos horários de funcionamento',
      'Avaliações físicas periódicas inclusas',
      'Isenção de taxa de matrícula',
      'Direito a 1 passe livre mensal para convidado'
    ],
    observation: '* Consulte opções de parcelamento na recepção ou pelo WhatsApp.'
  },
  {
    id: 'personalizado',
    name: 'Plano Personalizado',
    price: 'Sob consulta',
    periodicity: '/acompanhamento',
    description: 'Atendimento individualizado com personal trainer focado no seu objetivo.',
    benefits: [
      'Acompanhamento direto nos treinos',
      'Treino diferenciado e periodizado',
      'Plano alimentar / dieta direcionada',
      'Ajustes periódicos de evolução'
    ],
    observation: '* Valores, dias da semana e horários combinados diretamente com o personal trainer.',
    badgeText: 'Personal Trainer'
  }
];