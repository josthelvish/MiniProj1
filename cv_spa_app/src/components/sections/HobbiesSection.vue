<script setup lang="ts">
import type { HobbiesData } from '@/models/types'
import Badge from '@/components/common/Badge.vue'
import ImagePlaceholder from '@/components/common/ImagePlaceholder.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'

defineProps<{ hobbies: HobbiesData }>()
</script>

<template>
  <section id="hobbies" class="section" tabindex="-1" aria-labelledby="hobbies-title">
    <div class="container">
      <SectionHeader :heading="hobbies.heading" title-id="hobbies-title" />

      <ul class="cards-grid">
        <li v-for="hobby in hobbies.items" :key="hobby.id" class="hobby-card">
          <ImagePlaceholder :image="hobby.image" class="hobby-card__image" />
          <div class="hobby-card__body">
            <Badge :label="hobby.kicker" size="sm" as="p" />
            <h3 class="hobby-card__title">{{ hobby.title }}</h3>
            <p class="hobby-card__desc">{{ hobby.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hobby-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.hobby-card__image {
  height: 10.5rem;
  border-bottom: 1px solid var(--color-border-strong);
}

.hobby-card__body {
  padding: 1.6rem 1.5rem 1.5rem;
}

.hobby-card__title {
  margin: 0.4rem 0 0.6rem;
  font-size: 1.3125rem;
  font-weight: 600;
  line-height: 1.3;
}

.hobby-card__desc {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-soft);
}

@media (max-width: 767px) {
  .hobby-card__image {
    height: 11.5rem;
  }

  .hobby-card__body {
    padding: 1.25rem;
  }
}
</style>
