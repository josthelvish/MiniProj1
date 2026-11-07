<script setup lang="ts">
import type { NavItem, SectionId } from '@/models/types'
import AppIcon from '@/components/common/AppIcon.vue'

defineProps<{
  brandName: string
  brandInitials: string
  items: NavItem[]
  activeId: SectionId
  isMenuOpen: boolean
  navLabel: string
  openMenuLabel: string
  closeMenuLabel: string
}>()

const emit = defineEmits<{
  navigate: [id: SectionId]
  toggleMenu: []
}>()
</script>

<template>
  <header class="header" data-app-header>
    <div class="container header__inner">
      <a class="header__brand" href="#inicio" @click.prevent="emit('navigate', 'inicio')">
        <span class="header__logo" aria-hidden="true">{{ brandInitials }}</span>
        <span class="header__name">{{ brandName }}</span>
      </a>

      <nav class="header__nav" :aria-label="navLabel">
        <ul class="header__list">
          <li v-for="item in items" :key="item.id">
            <a
              class="header__link"
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

      <button
        type="button"
        class="header__toggle"
        :aria-label="isMenuOpen ? closeMenuLabel : openMenuLabel"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        @click="emit('toggleMenu')"
      >
        <AppIcon :name="isMenuOpen ? 'close' : 'menu'" :size="20" :stroke-width="1.5" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: var(--z-header);
  height: var(--header-height);
  padding-right: var(--scrollbar-compensation, 0);
  background: rgb(255 255 255 / 0.92);
  backdrop-filter: saturate(180%) blur(10px);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  border-bottom: 1px solid var(--color-border-strong);
}

.header__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.header__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text);
}

.header__logo {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--color-icon);
  border-radius: var(--radius-sm);
  background: var(--color-bg-muted);
  font-size: 0.8125rem;
  font-weight: 700;
}

.header__name {
  font-size: 1.0625rem;
  font-weight: 600;
}

.header__list {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.header__link {
  position: relative;
  display: inline-block;
  padding: 0.5rem 0;
  font-size: 0.9375rem;
  color: var(--color-text-soft);
  transition: color var(--transition);
}

/* Barra preta sólida por baixo do item ativo (mock "Início") */
.header__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--color-text);
  transform: scaleX(0);
  transition: transform var(--transition);
}

.header__link:hover {
  color: var(--color-text);
}

.header__link.is-active {
  color: var(--color-text);
  font-weight: 600;
}

.header__link.is-active::after {
  transform: scaleX(1);
}

.header__toggle {
  display: none;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--color-icon);
  border-radius: var(--radius-sm);
  background: var(--color-bg-alt);
  color: var(--color-text);
}

@media (max-width: 767px) {
  .header__nav {
    display: none;
  }

  .header__toggle {
    display: grid;
  }

  .header__logo {
    width: 2rem;
    height: 2rem;
    font-size: 0.75rem;
  }

  .header__name {
    font-size: 1rem;
  }
}
</style>
