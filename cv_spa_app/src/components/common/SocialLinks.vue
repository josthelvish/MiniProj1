<script setup lang="ts">
import type { SocialLink } from '@/models/types'
import AppIcon from './AppIcon.vue'

defineProps<{
  links: SocialLink[]
  title: string
}>()

const isExternal = (url: string) => /^https?:\/\//.test(url)
</script>

<template>
  <nav class="social" :aria-label="title">
    <ul class="social__list">
      <li v-for="link in links" :key="link.id">
        <a
          class="social__link"
          :href="link.url"
          :target="isExternal(link.url) ? '_blank' : undefined"
          :rel="isExternal(link.url) ? 'noopener noreferrer' : undefined"
        >
          <span class="social__box" aria-hidden="true">
            <AppIcon v-if="link.icon" :name="link.icon" :size="18" :stroke-width="1.75" />
            <template v-else>{{ link.short }}</template>
          </span>
          <span class="social__label">{{ link.label }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.social__list {
  display: flex;
  gap: 0.875rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.social__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-text-soft);
}

.social__box {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text);
  transition:
    background-color var(--transition),
    border-color var(--transition),
    transform var(--transition);
}

.social__link:hover .social__box {
  border-color: var(--color-text);
  transform: translateY(-2px);
}

.social__label {
  font-size: 0.65625rem;
  white-space: nowrap;
}
</style>
