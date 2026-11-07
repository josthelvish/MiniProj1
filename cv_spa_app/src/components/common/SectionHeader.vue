<script setup lang="ts">
import type { SectionHeading } from '@/models/types'
import Badge from './Badge.vue'

defineProps<{
  heading: SectionHeading
  titleId: string
}>()
</script>

<template>
  <header class="section-header">
    <Badge :label="heading.eyebrow" as="p" />
    <h2 :id="titleId" class="section-header__title">{{ heading.title }}</h2>
    <p class="section-header__subtitle">{{ heading.subtitle }}</p>
  </header>
</template>

<style scoped>
.section-header {
  margin-bottom: 2.4rem;
}

.section-header__title {
  margin: 0.5rem 0 0.4rem;
  font-size: clamp(1.625rem, 3vw, 1.875rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.section-header__subtitle {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--color-text-soft);
}
</style>
