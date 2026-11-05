<script setup lang="ts">
import type { SkillsData } from '@/models/types'
import SectionHeader from '@/components/common/SectionHeader.vue'

defineProps<{ skills: SkillsData }>()
</script>

<template>
  <section
    id="o-que-faco"
    class="section section--alt"
    tabindex="-1"
    aria-labelledby="o-que-faco-title"
  >
    <div class="container">
      <SectionHeader :heading="skills.heading" title-id="o-que-faco-title" />

      <ul class="cards-grid">
        <li v-for="skill in skills.items" :key="skill.id" class="skill-card">
          <span class="skill-card__icon" aria-hidden="true">
            <img
              v-if="skill.iconSrc"
              class="skill-card__icon-img"
              :src="skill.iconSrc"
              alt=""
              width="24"
              height="24"
            />
            <template v-else>{{ skill.glyph }}</template>
          </span>
          <h3 class="skill-card__title">{{ skill.title }}</h3>
          <p class="skill-card__desc">{{ skill.description }}</p>
          <p class="skill-card__tags">{{ skill.tags.join(' · ') }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.skill-card {
  padding: 1.4rem 1.5rem 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  transition:
    border-color var(--transition),
    transform var(--transition);
}

.skill-card:hover {
  border-color: var(--color-icon);
  transform: translateY(-2px);
}

.skill-card__icon {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: var(--color-bg-muted);
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  color: var(--color-text-soft);
}

/* Ícone em imagem: mesmo tamanho e tom cinzento dos glifos de texto */
.skill-card__icon-img {
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
  opacity: 0.75;
}

.skill-card__title {
  margin: 1.6rem 0 0.75rem;
  font-size: 1.1875rem;
  font-weight: 600;
  line-height: 1.3;
}

.skill-card__desc {
  margin: 0 0 0.9rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-soft);
}

.skill-card__tags {
  margin: 0;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}
</style>
