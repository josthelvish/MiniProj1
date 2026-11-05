<script setup lang="ts">
import type { AboutData, ModalContent } from '@/models/types'
import Badge from '@/components/common/Badge.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import TimelineItem from '@/components/common/TimelineItem.vue'

defineProps<{ about: AboutData }>()

const emit = defineEmits<{ openDetails: [content: ModalContent] }>()
</script>

<template>
  <section id="quem-sou" class="section" tabindex="-1" aria-labelledby="quem-sou-title">
    <div class="container">
      <SectionHeader :heading="about.heading" title-id="quem-sou-title" />

      <article class="about-card">
        <div class="about-card__bio">
          <p class="about-card__lead">{{ about.lead }}</p>
          <p v-for="(paragraph, i) in about.paragraphs" :key="i" class="about-card__text">
            {{ paragraph }}
          </p>

          <ul class="about-card__list">
            <li v-for="item in about.highlights" :key="item">{{ item }}</li>
          </ul>

          <button
            type="button"
            class="btn btn--outline"
            aria-haspopup="dialog"
            @click="emit('openDetails', about.modal)"
          >
            {{ about.ctaLabel }}
          </button>
        </div>

        <aside class="about-card__summary" aria-labelledby="percurso-title">
          <Badge id="percurso-title" :label="about.timelineTitle" as="p" />
          <ol class="about-card__timeline">
            <TimelineItem v-for="entry in about.timeline" :key="entry.id" :entry="entry" />
          </ol>
        </aside>
      </article>
    </div>
  </section>
</template>

<style scoped>
.about-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 18rem;
  gap: 3rem;
  align-items: start;
  padding: 2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
}

.about-card__lead {
  margin: 0.6rem 0 1.1rem;
  font-size: 1.03rem;
  line-height: 1.6;
  color: var(--color-text);
}

.about-card__text {
  margin: 0 0 1rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-text-soft);
}

.about-card__list {
  margin: 0 0 1.25rem;
  padding-left: 1.2rem;
  font-size: 0.9375rem;
  color: var(--color-text-soft);
}

.about-card__list li + li {
  margin-top: 0.6rem;
}

.about-card__summary {
  padding: 1.5rem;
  background: var(--color-bg-muted);
  border-radius: var(--radius-sm);
}

.about-card__timeline {
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
}

@media (max-width: 899px) {
  .about-card {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 767px) {
  .about-card {
    padding: 1.25rem;
  }

  .about-card__lead {
    margin-top: 0;
  }

  .about-card__summary {
    padding: 1.25rem;
  }
}
</style>
