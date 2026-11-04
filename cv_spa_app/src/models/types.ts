import type { IconName } from '@/assets/icons'

/**
 * MODEL — Contratos de dados entre a aplicação e todas as Views.
 */
export type SectionId = 'inicio' | 'quem-sou' | 'o-que-faco' | 'hobbies'

export interface NavItem {
  id: SectionId
  label: string
}

export interface SectionHeading {
  eyebrow: string
  title: string
  subtitle: string
}

export interface ImageAsset {
  label: string
  src?: string
  alt?: string
}

export interface Profile {
  name: string
  initials: string
  eyebrow: string
  role: string
  tagline: string
  meta: string[]
  photo: ImageAsset
}

export interface TimelineEntry {
  id: string
  period: string
  role: string
  place: string
}

export interface ModalContent {
  id: string
  eyebrow: string
  title: string
  image: ImageAsset
  heading: string
  paragraphs: string[]
  highlights: string[]
  closeLabel: string
}

export interface AboutData {
  heading: SectionHeading
  lead: string
  paragraphs: string[]
  highlights: string[]
  ctaLabel: string
  timelineTitle: string
  timeline: TimelineEntry[]
  modal: ModalContent
}

export interface SkillCard {
  id: string
  glyph: string
  title: string
  description: string
  tags: string[]
}

export interface SkillsData {
  heading: SectionHeading
  items: SkillCard[]
}

export interface Hobby {
  id: string
  image: ImageAsset
  kicker: string
  title: string
  description: string
}

export interface HobbiesData {
  heading: SectionHeading
  items: Hobby[]
}

export interface SocialLink {
  id: string
  /** Texto curto mostrado no botão (ex.: "in") — usado quando não há `icon`. */
  short: string
  label: string
  url: string
  /** Ícone SVG opcional; quando definido, substitui o texto curto. */
  icon?: IconName
}

export interface FooterData {
  copyright: string
  note: string
  socials: SocialLink[]
  socialTitle: string
}

export interface UiLabels {
  skipToContent: string
  mainNavigation: string
  openMenu: string
  closeMenu: string
  closeDialog: string
}

export interface PortfolioData {
  navigation: NavItem[]
  profile: Profile
  about: AboutData
  skills: SkillsData
  hobbies: HobbiesData
  footer: FooterData
  ui: UiLabels
}
