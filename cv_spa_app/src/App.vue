<script setup lang="ts">

import { portfolioData } from '@/models/portfolioData'
import { useNavigation } from '@/composables/useNavigation'
import { useModal } from '@/composables/useModal'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import MenuMobile from '@/components/layout/MenuMobile.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import HobbiesSection from '@/components/sections/HobbiesSection.vue'
import BaseModal from '@/components/common/BaseModal.vue'

const { navigation, profile, about, skills, hobbies, footer, ui } = portfolioData

const { activeSection, isMenuOpen, scrollToSection, toggleMenu, closeMenu } = useNavigation({
  track: navigation.map((item) => item.id),
})

const modal = useModal()
const { isOpen: isModalOpen, content: modalContent } = modal
</script>

<template>
  <a class="skip-link" href="#quem-sou" @click.prevent="scrollToSection('quem-sou')">
    {{ ui.skipToContent }}
  </a>

  <AppHeader
    :brand-name="profile.name"
    :brand-initials="profile.initials"
    :items="navigation"
    :active-id="activeSection"
    :is-menu-open="isMenuOpen"
    :nav-label="ui.mainNavigation"
    :open-menu-label="ui.openMenu"
    :close-menu-label="ui.closeMenu"
    @navigate="scrollToSection"
    @toggle-menu="toggleMenu"
  />

  <MenuMobile
    :open="isMenuOpen"
    :items="navigation"
    :active-id="activeSection"
    :nav-label="ui.mainNavigation"
    @navigate="scrollToSection"
    @close="closeMenu"
  />

  <main id="main">
    <HeroSection :profile="profile" />

    <div class="content-layer">
      <AboutSection :about="about" @open-details="modal.open" />
      <SkillsSection :skills="skills" />
      <HobbiesSection :hobbies="hobbies" />
      <AppFooter :footer="footer" />
    </div>
  </main>

  <BaseModal
    :open="isModalOpen"
    :content="modalContent"
    :close-icon-label="ui.closeDialog"
    @close="modal.close"
    @after-leave="modal.clear"
  />
</template>
