/**
 * CONTROLLER — Gestão do Modal.
 *  - Abrir com um ModalContent do Model / fechar;
 *  - Bloqueio do scroll do body (classe `overflow-hidden`);
 *  - Fecho com a tecla Escape;
 *  - Devolução do foco ao elemento que abriu o modal.
 */
import { computed, nextTick, readonly, ref, shallowRef } from 'vue'
import type { ModalContent } from '@/models/types'
import { useScrollLock } from './useScrollLock'

const isOpen = ref(false)
const content = shallowRef<ModalContent | null>(null)
const scrollLock = useScrollLock('modal')
let returnFocusTo: HTMLElement | null = null

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    event.stopPropagation()
    close()
  }
}

function open(next: ModalContent): void {
  returnFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null
  content.value = next
  isOpen.value = true
  scrollLock.lock()
  window.addEventListener('keydown', onKeydown)
}

function close(): void {
  if (!isOpen.value) return
  isOpen.value = false
  scrollLock.unlock()
  window.removeEventListener('keydown', onKeydown)
  void nextTick(() => {
    returnFocusTo?.focus()
    returnFocusTo = null
  })
}

/** Limpa o conteúdo depois da transição de saída terminar. */
function clear(): void {
  if (!isOpen.value) content.value = null
}

export function useModal() {
  return {
    isOpen: readonly(isOpen),
    content: computed(() => content.value),
    open,
    close,
    clear,
  }
}
