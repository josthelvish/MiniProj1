<script setup lang="ts">
import type { FooterData } from '@/models/types'
import SocialLinks from '@/components/common/SocialLinks.vue'

defineProps<{ footer: FooterData }>()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div>
        <p class="footer__copy">{{ footer.copyright }}</p>
        <p class="footer__note">{{ footer.note }}</p>
      </div>
      <SocialLinks :links="footer.socials" :title="footer.socialTitle" />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-bg-muted);
  border-top: 1px solid var(--color-border-strong);
  padding: 1.75rem 0 2rem;
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer__copy {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text);
}

.footer__note {
  margin: 0.4rem 0 0;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

@media (max-width: 767px) {
  .footer__inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
