/* =========================================================
   PRODUTOS DO CATÁLOGO
   Este é o único arquivo que precisa mudar quando você
   quiser adicionar, editar ou remover um modelo.
   Toda vez que quiser atualizar, peça para o Claude gerar
   uma nova versão deste arquivo com a lista atualizada.
   ========================================================= */

// Número de WhatsApp da empresa (com DDI + DDD, só números)
const WHATSAPP_NUMBER = '5551981503616';

const PRODUCTS = [
  {
    name: 'Vaso geométrico hexagonal',
    desc: 'Vaso modular com faces facetadas, ideal para suculentas e plantas pequenas.',
    category: 'Decoração',
    price: '45,00',
    material: 'PLA',
    time: '4h',
    image: ''
  },
  {
    name: 'Suporte para fones de ouvido',
    desc: 'Base estável com encaixe arredondado, mantém o fone sempre organizado na mesa.',
    category: 'Organização',
    price: '32,00',
    material: 'PETG',
    time: '2h30',
    image: ''
  },
  {
    name: 'Miniatura articulada — dragão',
    desc: 'Figura com articulações móveis impressas em uma peça só, sem suportes.',
    category: 'Colecionáveis',
    price: '58,00',
    material: 'PLA',
    time: '6h',
    image: ''
  }
];
