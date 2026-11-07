/**
 * MODEL — Dados para alimentar as views
 */
import type { PortfolioData } from './types'

// Ícones de competências em imagem
import androidIcon from '@/assets/icons/android-os.png'

import bookImage from '@/assets/images/hobbies/book.jpg'
import sportsImage from '@/assets/images/hobbies/sports.jpg'
import cinemaImage from '@/assets/images/hobbies/cinema.jpg'
import meImage from '@/assets/images/personal/me.png'
import familyImage from '@/assets/images/personal/family.jpg'

const bioLead =
  'Chamo-me José, sou licenciado em Engenharia Informática e estou sempre disposto a abraçar projetos de inovação/transformação digital.'

const bioParagraph =
  'Desde 2013, que integro projetos e equipas de IT, a criar produtos web e mobile que equilibram clareza, desempenho e inclusão. Gosto de aprender em conjunto e de transformar problemas complexos em soluções simples.'

const qualifications = [
  'Licenciatura em Engenharia Informática · ISEP, 2013',
  'Arquitetura de soluções Android Mobile',
  'Desenvolvimento Web',
  'Português nativo · Inglês avançado',
]

export const portfolioData: PortfolioData = {
  navigation: [
    { id: 'inicio', label: 'Início' },
    { id: 'quem-sou', label: 'Quem Sou Eu' },
    { id: 'o-que-faco', label: 'O Que Faço' },
    { id: 'hobbies', label: 'Hobbies' },
  ],

  profile: {
    name: 'José Silva',
    initials: 'JS',
    eyebrow: 'Portfólio / CV',
    role: 'Desenvolvedor Mobile & Web',
    tagline:
      'Transformo ideias em experiências digitais simples, acessíveis e úteis. Entre código e design, procuro sempre o lado humano da tecnologia.',
    meta: ['Porto, Portugal', 'Disponível para colaborar'],
    photo: { src: meImage, label: 'Fotografia', alt: 'Fotografia de José Silva' },
  },

  about: {
    heading: {
      eyebrow: '01 / Sobre mim',
      title: 'Quem Sou Eu?',
      subtitle: 'O meu percurso, os meus valores e o que me move.',
    },
    lead: bioLead,
    paragraphs: [bioParagraph],
    highlights: qualifications,
    ctaLabel: 'Saber Mais',
    timelineTitle: 'Percurso em resumo',
    timeline: [
      {
        id: 'tl-1',
        period: '2020 — Atual',
        role: 'Arquiteto de Soluções Mobile',
        place: 'MBCP & AB · Lisboa',
      },
      { id: 'tl-1', period: '2018 — 2020', role: 'Head of quality', place: 'Codavel · Porto' },
      {
        id: 'tl-1',
        period: '2013 — 2018',
        role: 'Software Engineer',
        place: 'Streambolico · Porto',
      },
      {
        id: 'tl-2',
        period: '2013 — 2016',
        role: 'Estudante Engenharia Informática',
        place: 'ISEP · Porto',
      },
    ],
    modal: {
      id: 'modal-bio',
      eyebrow: 'Sobre mim / Biografia',
      title: 'Quem sou eu?',
      image: {
        src: familyImage,
        label: 'Foto · José Silva · Porto, Portugal',
        alt: 'Fotografia de José Silva no Porto',
      },
      heading: 'O meu percurso, os meus valores e o que me move',
      paragraphs: [
        'Tudo isto acontece e é possível graças à minha familía.',
        'É este o grande pilar de todos os meus outros valores, o garante que me permite viver segundo eles. E é também graças a ela que me posso dedicar às minhas outras duas paixões, o trabalho e a aprendizagem constante.',
      ],
      highlights: qualifications,
      closeLabel: 'Fechar',
    },
  },

  skills: {
    heading: {
      eyebrow: '02 / Competências',
      title: 'O Que Faço?',
      subtitle: 'Da ideia à implementação, com foco em quem utiliza e na segurança da solução',
    },
    items: [
      {
        id: 'sk-frontend',
        glyph: '</>',
        title: 'Desenvolvimento Front-end',
        description:
          'Interfaces responsivas, rápidas e acessíveis, do primeiro componente à experiência final.',
        tags: ['React', 'TypeScript', 'HTML / CSS'],
      },
      {
        id: 'sk-android',
        glyph: '▦',
        iconSrc: androidIcon,
        title: 'Desenvolvimento Mobile Android',
        description: 'Arquitetura de aplicações mobile',
        tags: ['Android', 'Clean Architecture', 'Mobile Security', 'MVVM'],
      },
      {
        id: 'sk-quality',
        glyph: '{ }',
        title: 'Integração & Qualidade',
        description:
          'Ligações a APIs e testes que tornam os produtos mais fiáveis e fáceis de manter.',
        tags: ['REST APIs', 'Git', 'Testes'],
      },
    ],
  },

  hobbies: {
    heading: {
      eyebrow: '03 / Fora do ecrã',
      title: 'Hobbies',
      subtitle: 'Tento sempre encontrar formas de me rejuvenescer, explorar, aprender e criar.',
    },
    items: [
      {
        id: 'hb-reading',
        image: {
          label: 'Imagem · Leitura de livros',
          src: bookImage,
          alt: 'Livraria com estantes e mesas cheias de livros, a preto e branco',
        },
        kicker: 'Perder-me e encontrar-me no meio de parágrafos',
        title: 'Literatura',
        description:
          'Adoro ler. Procuro sempre leituras que me ajudem a saciar a minha eterna busca pelo conhecimento, mas entre os livros de história e técnicos procuro sempre conhecer um bom romance.',
      },
      {
        id: 'hb-sports',
        image: {
          label: 'Imagem · Saúde, desporto e bem estar',
          src: sportsImage,
          alt: 'Ciclista de BTT parado num trilho de terra no meio do bosque, a preto e branco',
          position: 'center 10%',
        },
        kicker: 'Desligar para recarregar',
        title: 'Desporto',
        description:
          'Pratico diversos tipos de desporto (ginásio, futebol, btt, padel...), casualmente e sempre com o foco na saúde e bem-estar pessoal.',
      },
      {
        id: 'hb-cinema',
        image: {
          label: 'Imagem · Cinema',
          src: cinemaImage,
          alt: 'Ilustração de um projetor de cinema antigo com bobinas e película',
        },
        kicker: 'A 7ª arte',
        title: 'Cinema',
        description:
          'Algures entre os monitores, e os cada vez menos espaços vazios, procuro encontrar tempo para um bom filme, não importa o género desde que a interpretação ou o argumento sejam de excelência.',
      },
    ],
  },

  footer: {
    copyright: '© 2026 José Silva.',
    note: 'Semper discens',
    socialTitle: 'Redes sociais',
    socials: [
      {
        id: 'linkedin',
        short: 'in',
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/jose-rsilva/',
      },
      { id: 'github', short: 'GH', label: 'GitHub', url: 'https://github.com/josthelvish' },
      {
        id: 'whatsapp',
        short: 'WA',
        label: 'WhatsApp',
        url: 'https://wa.me/351919143562',
        icon: 'whatsapp',
      },
      { id: 'email', short: '@', label: 'Email', url: 'mailto:al2026137334@alunos.utad.pt' },
    ],
  },

  ui: {
    skipToContent: 'Saltar para o conteúdo',
    mainNavigation: 'Navegação principal',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    closeDialog: 'Fechar janela',
  },
}
