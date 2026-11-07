<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { ModalContent } from '@/models/types'
import AppIcon from './AppIcon.vue'
import Badge from './Badge.vue'
import ImagePlaceholder from './ImagePlaceholder.vue'

const props = defineProps<{
  open: boolean
  content: ModalContent | null
  closeIconLabel: string
}>()

const emit = defineEmits<{
  close: []
  afterLeave: []
}>()

const dialogRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)

// Foco inicial no botão [X] sempre que o modal abre.
watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) return
    await nextTick()
    closeBtnRef.value?.focus()
  },
)

/** Focus trap: o Tab circula apenas dentro do diálogo enquanto está aberto. */
function onKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Tab' || !dialogRef.value) return
  const focusable = dialogRef.value.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )
  if (focusable.length === 0) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal" @after-leave="emit('afterLeave')">
      <div v-if="open && content" class="modal" @keydown="onKeydown">
        <div class="modal__backdrop" aria-hidden="true" @click="emit('close')" />

        <div
          ref="dialogRef"
          class="modal__dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`${content.id}-title`"
        >
          <header class="modal__header">
            <div>
              <Badge :label="content.eyebrow" size="sm" as="p" />
              <h2 :id="`${content.id}-title`" class="modal__title">{{ content.title }}</h2>
            </div>
            <button
              ref="closeBtnRef"
              type="button"
              class="modal__icon-btn"
              :aria-label="closeIconLabel"
              @click="emit('close')"
            >
              <AppIcon name="close" :size="20" :stroke-width="1.5" />
            </button>
          </header>

          <div class="modal__body">
            <ImagePlaceholder :image="content.image" icon="user" class="modal__image" />

            <h3 class="modal__heading">{{ content.heading }}</h3>
            <p v-for="(paragraph, i) in content.paragraphs" :key="i" class="modal__text">
              {{ paragraph }}
            </p>

            <ul class="modal__highlights">
              <li v-for="item in content.highlights" :key="item">{{ item }}</li>
            </ul>
          </div>

          <footer class="modal__footer">
            <button type="button" class="btn btn--outline modal__close" @click="emit('close')">
              {{ content.closeLabel }}
            </button>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal__backdrop {
  position: absolute;
  inset: 0;
  background: var(--color-overlay);
}

.modal__dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(100%, 42.5rem);
  max-height: calc(100dvh - 2rem);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-modal);
  overflow: hidden;
}

.modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 2rem 1.4rem;
  border-bottom: 1px solid var(--color-border);
}

.modal__title {
  margin: 0.4rem 0 0;
  font-size: 1.625rem;
  font-weight: 600;
  line-height: 1.2;
}

.modal__icon-btn {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  margin-top: 0.5rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  transition: background-color var(--transition);
}

.modal__icon-btn:hover {
  background: var(--color-bg-alt);
}

.modal__body {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  overscroll-behavior: contain;
}

.modal__image {
  height: 11.25rem;
  border: 1px solid var(--color-border-strong);
}

.modal__heading {
  margin: 2.1rem 0 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
}

.modal__text {
  margin: 0 0 0.9rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-text-soft);
}

.modal__highlights {
  margin: 1.4rem 0 0;
  padding: 1.1rem 1.25rem 1.1rem 2.4rem;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  font-size: 0.9375rem;
  color: var(--color-text-soft);
}

.modal__highlights li + li {
  margin-top: 0.55rem;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  padding: 1.25rem 2rem;
  border-top: 1px solid var(--color-border);
}

/* Mobile (mock "Modal Mobile") */
@media (max-width: 599px) {
  .modal__header {
    padding: 1.4rem 1.25rem 1.1rem;
  }

  .modal__title {
    font-size: 1.5rem;
  }

  .modal__body {
    padding: 1.25rem;
  }

  .modal__image {
    height: 8.75rem;
  }

  .modal__heading {
    margin-top: 1.5rem;
  }

  .modal__footer {
    padding: 1.1rem 1.25rem;
  }

  .modal__close {
    width: 100%;
  }
}

/* Transições */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal__dialog,
.modal-leave-active .modal__dialog {
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal__dialog,
.modal-leave-to .modal__dialog {
  transform: translateY(12px) scale(0.98);
}
</style>
