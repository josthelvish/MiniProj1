<script setup lang="ts">
import type { TimelineEntry } from '@/models/types'

defineProps<{ entry: TimelineEntry }>()
</script>

<template>
  <li class="timeline-item">
    <p class="timeline-item__period">{{ entry.period }}</p>
    <h4 class="timeline-item__role">{{ entry.role }}</h4>
    <p class="timeline-item__place">{{ entry.place }}</p>
  </li>
</template>

<style scoped>
.timeline-item + .timeline-item {
  margin-top: 1.25rem;
}

.timeline-item__period {
  margin: 0 0 0.2rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.timeline-item__role {
  margin: 0 0 0.25rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
}

.timeline-item__place {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--color-text-soft);
}
</style>
