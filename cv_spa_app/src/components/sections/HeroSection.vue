<script setup lang="ts">
import type { Profile } from '@/models/types'
import Badge from '@/components/common/Badge.vue'
import ImagePlaceholder from '@/components/common/ImagePlaceholder.vue'

defineProps<{ profile: Profile }>()
</script>

<template>
  <section id="inicio" class="hero" tabindex="-1" aria-labelledby="inicio-title">
    <div class="container hero__inner">
      <div class="hero__content">
        <Badge :label="profile.eyebrow" as="p" />
        <h1 id="inicio-title" class="hero__name">{{ profile.name }}</h1>
        <p class="hero__role">{{ profile.role }}</p>
        <p class="hero__tagline">{{ profile.tagline }}</p>
        <p class="hero__meta">{{ profile.meta.join(' · ') }}</p>
      </div>

      <ImagePlaceholder :image="profile.photo" icon="user" shape="circle" class="hero__photo" />
    </div>
  </section>
</template>

<style scoped>
/*
 * Camadas: o Hero fica "colado" por baixo do header (sticky, z-index 20, fundo opaco)
 * e o contentor das secções seguintes (z-index 10) desliza por trás dele.
 */
.hero {
  position: sticky;
  top: var(--header-height);
  z-index: var(--z-hero);
  background: var(--color-bg-alt);
  /* Altura definida só pelo conteúdo: espaçamento interno compacto */
  padding: 2rem 0;
}

.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 2.5rem;
}

.hero__content {
  max-width: 44rem;
}

.hero__name {
  margin: 0.6rem 0 0.25rem;
  font-size: clamp(2rem, 4vw, 2.625rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--color-text);
}

.hero__role {
  margin: 0;
  font-size: clamp(1.15rem, 2vw, 1.375rem);
  font-weight: 400;
  color: var(--color-text-soft);
}

.hero__tagline {
  margin: 0.9rem 0 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-soft);
}

.hero__meta {
  margin: 1.1rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.hero__photo {
  /* Mais pequena que o bloco de texto, para não ser ela a ditar a altura da secção */
  width: 9.5rem;
}

/* Tablet */
@media (max-width: 1023px) {
  .hero__photo {
    width: 8rem;
  }
}

/* Mobile: avatar acima do título */
@media (max-width: 767px) {
  .hero {
    padding: 1.25rem 0 1.5rem;
  }

  .hero__inner {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .hero__photo {
    order: -1;
    width: 4.5rem;
  }

  .hero__photo :deep(svg) {
    width: 2.5rem;
    height: 2.5rem;
  }

  .hero__photo :deep(.placeholder__label) {
    font-size: 0.6rem;
  }

  .hero__name {
    margin-top: 0.5rem;
  }

  .hero__tagline {
    margin-top: 0.75rem;
  }

  .hero__meta {
    margin-top: 1rem;
  }
}

/*
 * Ajustados os ecrãs pequenos (mobile ou janelas pequenas)
 */
@media (max-width: 767px), (max-height: 640px) {
  .hero {
    position: relative;
    top: 0;
  }
}
</style>
