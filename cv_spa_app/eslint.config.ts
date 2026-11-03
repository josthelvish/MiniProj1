/**
 * ESLint 9 — flat config para Vue 3 + TypeScript.
 *  - eslint-plugin-vue (flat/recommended): boas práticas e legibilidade de templates;
 *  - @vue/eslint-config-typescript: regras recomendadas do typescript-eslint para .ts e .vue;
 *  - skip-formatting: desliga as regras de formatação — a formatação é do Prettier.
 */
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/coverage/**', '**/node_modules/**'],
  },

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    name: 'app/custom-rules',
    rules: {
      // Nomes de componentes de uma só palavra pedidos na especificação (ex.: Badge.vue).
      'vue/multi-word-component-names': ['error', { ignores: ['Badge'] }],
      // Eventos e props sempre declarados e tipados.
      'vue/require-explicit-emits': 'error',
      'vue/define-macros-order': ['error', { order: ['defineProps', 'defineEmits'] }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/no-unused-refs': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      // TypeScript
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Geral
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
    },
  },

  skipFormatting,
)
