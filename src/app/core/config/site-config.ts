export const SITE_CONFIG = {
  academyName: 'Power Shape Academia',
  foundedYear: 2022,
  // Substituir pelo número oficial (DDI + DDD + Número, apenas dígitos)
  whatsappNumber: '559184200319',
  phoneDisplay: '(91) 98420-0319',
  instagramUrl: 'https://instagram.com/powershape.oficial',
  instagramHandle: '@powershapeacademia',
  address: {
    street: 'Passagem Dalva, Nº 456',
    neighborhood: 'Marambaia',
    city: 'Belém',
    state: 'PA',
    zipCode: '66615-080',
    googleMapsLink: 'https://maps.app.goo.gl/fBindvK9gco7Hw2v6',
    googleMapsEmbedUrl: '' // Inserir URL do iframe do Google Maps quando disponível
  },
  // Dentro de SITE_CONFIG:
  googleReviews: {
    placeId: 'ChIJYzl-f_iLpJIRkVOk-C_BPS4',
    apiKey: 'AIzaSyDc6aUbHoSUwfGtYx8oseQD7K4tmP5htnc',
    googleProfileUrl: 'https://maps.app.goo.gl/fBindvK9gco7Hw2v6'
  },
  businessHours: [
    { days: 'Segunda a Sexta', hours: '06:00 às 23:00' },
    { days: 'Sábado', hours: '07:00 às 12:00' },
    { days: 'Sábado', hours: '14:00 às 17:00' },
    { days: 'Domingo', hours: '07:00 às 12:00' },
    { days: 'Feriados', hours: 'Conulte nossos horários' },
  ],
  defaultWhatsappMessage:
    'Olá! Encontrei a Power Shape pelo site e gostaria de informações sobre matrícula, planos e horários.'
} as const;