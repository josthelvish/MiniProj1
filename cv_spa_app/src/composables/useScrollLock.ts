/**
 * CONTROLLER (utilitário) — Bloqueio partilhado do scroll do <body>.
 * Vários consumidores (menu mobile, modal) podem pedir o bloqueio em simultâneo;
 * a classe `overflow-hidden` só é removida quando todos o libertarem.
 */
const owners = new Set<string>()

function apply(): void {
  const body = document.body
  if (owners.size > 0) {
    // Compensa a largura da scrollbar para evitar "saltos" de layout.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.setProperty('--scrollbar-compensation', `${scrollbar}px`)
    body.classList.add('overflow-hidden')
  } else {
    body.classList.remove('overflow-hidden')
    body.style.removeProperty('--scrollbar-compensation')
  }
}

export function useScrollLock(owner: string) {
  return {
    lock(): void {
      owners.add(owner)
      apply()
    },
    unlock(): void {
      owners.delete(owner)
      apply()
    },
  }
}
