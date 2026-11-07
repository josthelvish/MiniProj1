<script setup lang="ts">
import type { ImageAsset } from '@/models/types'
import type { IconName } from '@/assets/icons'
import AppIcon from './AppIcon.vue'

/** Mostra a imagem real se existir `src`; caso contrário, o placeholder cinzento do mock. */
withDefaults(
  defineProps<{
    image: ImageAsset
    icon?: IconName
    shape?: 'rect' | 'circle'
  }>(),
  { icon: 'image', shape: 'rect' },
)
</script>

<template>
  <figure class="placeholder" :class="`placeholder--${shape}`">
    <img
      v-if="image.src"
      class="placeholder__img"
      :src="image.src"
      :alt="image.alt ?? image.label"
      :style="image.position ? { objectPosition: image.position } : undefined"
      loading="lazy"
      decoding="async"
    />
    <template v-else>
      <AppIcon :name="icon" :size="shape === 'circle' ? 80 : 32" :stroke-width="shape === 'circle' ? 1 : 1.25" />
      <figcaption class="placeholder__label">{{ image.label }}</figcaption>
    </template>
  </figure>
</template>

<style scoped>
.placeholder {
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  overflow: hidden;
  background: var(--color-placeholder);
  color: var(--color-icon);
  text-align: center;
}

.placeholder--circle {
  border-radius: 50%;
  border: 1px solid var(--color-border-strong);
  aspect-ratio: 1;
  gap: 0.25rem;
}

.placeholder__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder__label {
  padding-inline: 1rem;
  font-size: 0.78rem;
  color: var(--color-text-soft);
}
</style>
