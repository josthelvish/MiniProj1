<script setup lang="ts">
/** Etiqueta editorial em maiúsculas (ex.: "OLHAR COM ATENÇÃO", "01 / SOBRE MIM"). */
withDefaults(
  defineProps<{
    label: string
    size?: 'sm' | 'md'
    as?: 'span' | 'p'
  }>(),
  { size: 'md', as: 'span' },
)
</script>

<template>
  <component :is="as" class="badge" :class="`badge--${size}`">{{ label }}</component>
</template>

<style scoped>
.badge {
  display: block;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-text-muted);
  line-height: 1.3;
}

.badge--md {
  font-size: 0.75rem;
  letter-spacing: 0.14em;
}

.badge--sm {
  font-size: 0.65625rem;
  letter-spacing: 0.1em;
}
</style>
