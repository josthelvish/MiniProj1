<script setup lang="ts">
import type { NavItem, SectionId } from '@/models/types'

defineProps<{
  open: boolean
  items: NavItem[]
  activeId: SectionId
  navLabel: string
}>()

const emit = defineEmits<{
  navigate: [id: SectionId]
  close: []
}>()
</script>

<template>
  <Transition name="fade">
    <div v-if="open" class="menu-backdrop" aria-hidden="true" @click="emit('close')" />
  </Transition>

  <Transition name="drawer">
    <nav v-show="open" id="mobile-menu" class="menu-mobile" :aria-label="navLabel">
      <ul class="menu-mobile__list">
        <li v-for="item in items" :key="item.id">
          <a
            class="menu-mobile__link"
            :class="{ 'is-active': activeId === item.id }"
            :href="`#${item.id}`"
            :aria-current="activeId === item.id ? 'location' : undefined"
            @click.prevent="emit('navigate', item.id)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
  </Transition>
</template>

<style scoped>
.menu-backdrop {
  position: fixed;
  inset: var(--header-height) 0 0;
  z-index: calc(var(--z-header) - 2);
  background: var(--color-overlay);
}

.menu-mobile {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  z-index: calc(var(--z-header) - 1);
  padding: 0.5rem var(--gutter) 1.25rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border-strong);
}

.menu-mobile__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-mobile__link {
  display: block;
  padding: 0.95rem 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 1.0625rem;
  color: var(--color-text-soft);
}

.menu-mobile__link.is-active {
  color: var(--color-text);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
}

@media (min-width: 768px) {
  .menu-mobile,
  .menu-backdrop {
    display: none !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
