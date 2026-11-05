/**
 * CONTROLLER — Navegação.
 *  - Scroll spy com IntersectionObserver (secção ativa no menu);
 *  - Navegação programática com smooth scroll (respeita prefers-reduced-motion);
 *  - Estado do menu mobile (abrir/fechar, Escape, fecho automático em desktop).
 *
 * Particularidade do layout: a secção "Início" é `position: sticky` por baixo do
 * header e as restantes secções deslizam POR TRÁS dela. Por isso a área útil do
 * viewport começa no fundo do hero (header + hero), e não no topo da janela.
 * O observer usa um rootMargin calculado dinamicamente a partir dessa "oclusão"
 * e é recriado sempre que o hero ou a janela mudam de tamanho.
 *
 * O estado é partilhado (singleton de módulo) entre Header, MenuMobile, etc.
 */
import { onBeforeUnmount, onMounted, readonly, ref, watch } from 'vue'
import type { SectionId } from '@/models/types'
import { useScrollLock } from './useScrollLock'

const activeSection = ref<SectionId>('inicio')
const isMenuOpen = ref(false)

const DESKTOP_QUERY = '(min-width: 768px)'
/** Até quantos px de scroll se considera que o utilizador ainda está no "Início". */
const TOP_THRESHOLD = 80

const scrollLock = useScrollLock('mobile-menu')
watch(isMenuOpen, (open) => (open ? scrollLock.lock() : scrollLock.unlock()))

let heroId: SectionId = 'inicio'

/**
 * Após um clique no menu, a secção escolhida fica "fixada" como ativa enquanto o
 * scroll programático decorre e enquanto o utilizador não se afastar do destino.
 * (Com o Hero sticky, "Início" e "Quem Sou Eu" partilham a posição scrollY = 0.)
 */
let pinned: { id: SectionId; top: number } | null = null
let programmaticScroll = false
let programmaticTimer = 0

function endProgrammaticScroll(): void {
  programmaticScroll = false
  window.clearTimeout(programmaticTimer)
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Altura (px) do topo do viewport que está tapada por camadas fixas/sticky. */
function getOcclusion(): number {
  const header = document.querySelector<HTMLElement>('[data-app-header]')
  const hero = document.getElementById(heroId)
  let occlusion = header?.offsetHeight ?? 0
  if (hero && getComputedStyle(hero).position === 'sticky') occlusion += hero.offsetHeight
  return occlusion
}

function openMenu(): void {
  isMenuOpen.value = true
}

function closeMenu(): void {
  isMenuOpen.value = false
}

function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value
}

function scrollToSection(id: SectionId, smooth = true): void {
  const target = document.getElementById(id)
  if (!target) return
  closeMenu()

  const behavior: ScrollBehavior = smooth && !prefersReducedMotion() ? 'smooth' : 'auto'
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const rawTop =
    id === heroId ? 0 : target.getBoundingClientRect().top + window.scrollY - getOcclusion()
  const top = Math.round(Math.min(Math.max(0, rawTop), maxScroll))

  pinned = { id, top }
  programmaticScroll = true
  window.clearTimeout(programmaticTimer)
  // Fallback para browsers sem o evento `scrollend`.
  programmaticTimer = window.setTimeout(endProgrammaticScroll, 1000)
  window.scrollTo({ top, behavior })

  history.replaceState(null, '', id === heroId ? window.location.pathname : `#${id}`)
  activeSection.value = id
  target.focus({ preventScroll: true })
}

export interface UseNavigationOptions {
  /**
   * Secções a vigiar, por ordem. Quando fornecido, este consumidor torna-se o
   * dono do ciclo de vida (observer e listeners globais) — apenas o App.vue.
   * A primeira secção é tratada como o Hero sticky.
   */
  track?: readonly SectionId[]
}

export function useNavigation(options: UseNavigationOptions = {}) {
  const { track } = options

  if (track && track.length > 0) {
    heroId = track[0]
    const contentIds = track.slice(1)
    const visibleHeights = new Map<SectionId, number>()

    let observer: IntersectionObserver | null = null
    let resizeObserver: ResizeObserver | null = null
    let desktopMq: MediaQueryList | null = null
    let rafId = 0

    const resolveActive = (): void => {
      if (pinned) {
        if (programmaticScroll || Math.abs(window.scrollY - pinned.top) <= 2) {
          activeSection.value = pinned.id
          return
        }
        pinned = null
      }

      const doc = document.documentElement
      if (window.scrollY < TOP_THRESHOLD) {
        activeSection.value = heroId
        return
      }
      // Fim da página: a última secção pode ser curta e nunca dominar a faixa.
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        activeSection.value = track[track.length - 1]
        return
      }
      let best: SectionId | null = null
      let bestHeight = 0
      for (const [id, height] of visibleHeights) {
        if (height > bestHeight) {
          best = id
          bestHeight = height
        }
      }
      if (best) activeSection.value = best
    }

    /** Cria o observer com uma faixa = 45% superior da área visível abaixo do hero. */
    const buildObserver = (): void => {
      observer?.disconnect()
      visibleHeights.clear()

      const occlusion = getOcclusion()
      const visibleArea = Math.max(1, window.innerHeight - occlusion)
      const band = Math.round(visibleArea * 0.45)
      const bottomMargin = Math.max(0, window.innerHeight - occlusion - band)

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.id as SectionId
            if (entry.isIntersecting) visibleHeights.set(id, entry.intersectionRect.height)
            else visibleHeights.delete(id)
          })
          resolveActive()
        },
        {
          rootMargin: `-${occlusion}px 0px -${bottomMargin}px 0px`,
          threshold: Array.from({ length: 11 }, (_, i) => i / 10),
        },
      )

      contentIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer?.observe(el)
      })
    }

    const scheduleRebuild = (): void => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(buildObserver)
    }

    const onScroll = (): void => resolveActive()

    const onKeydown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isMenuOpen.value) closeMenu()
    }

    const onDesktopChange = (event: MediaQueryListEvent): void => {
      if (event.matches) closeMenu()
    }

    onMounted(() => {
      buildObserver()

      const hero = document.getElementById(heroId)
      resizeObserver = new ResizeObserver(scheduleRebuild)
      if (hero) resizeObserver.observe(hero)

      window.addEventListener('resize', scheduleRebuild)
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('scrollend', endProgrammaticScroll)
      window.addEventListener('keydown', onKeydown)
      desktopMq = window.matchMedia(DESKTOP_QUERY)
      desktopMq.addEventListener('change', onDesktopChange)

      // Deep-link: /#hobbies abre diretamente na secção.
      const hash = window.location.hash.slice(1) as SectionId
      if (contentIds.includes(hash)) requestAnimationFrame(() => scrollToSection(hash, false))
      else resolveActive()
    })

    onBeforeUnmount(() => {
      observer?.disconnect()
      resizeObserver?.disconnect()
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', scheduleRebuild)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scrollend', endProgrammaticScroll)
      window.removeEventListener('keydown', onKeydown)
      desktopMq?.removeEventListener('change', onDesktopChange)
      closeMenu()
    })
  }

  return {
    activeSection: readonly(activeSection),
    isMenuOpen: readonly(isMenuOpen),
    scrollToSection,
    openMenu,
    closeMenu,
    toggleMenu,
  }
}
