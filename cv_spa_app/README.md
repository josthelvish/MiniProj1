# Portfólio / CV — José Silva (Vue 3 + Vite + TypeScript)

SPA de portfólio construída com **Vue 3**, **Vite** e **TypeScript**.

## Como executar

Requisitos: **Node.js 18.18+** (recomendado 20 LTS ou superior) e npm.

```bash
npm install        # instala as dependências (incluindo ESLint e Prettier)
npm run dev        # servidor de desenvolvimento → http://localhost:5173
npm run build      # type-check (vue-tsc) + build de produção em dist/
npm run preview    # serve o build de produção localmente
```

### Scripts disponíveis

| Script                 | O que faz                                                    |
| ---------------------- | ------------------------------------------------------------ |
| `npm run dev`          | Servidor de desenvolvimento com HMR.                         |
| `npm run build`        | Type-check com `vue-tsc` e build de produção em `dist/`.     |
| `npm run preview`      | Serve localmente o build de produção.                        |
| `npm run type-check`   | Verifica os tipos de `.ts` e `.vue` sem gerar ficheiros.     |
| `npm run lint`         | Analisa o código com ESLint (sem alterar ficheiros).         |
| `npm run lint:fix`     | Corrige automaticamente os problemas de lint que o permitam. |
| `npm run format`       | Formata o projeto com Prettier.                              |
| `npm run format:check` | Confirma que tudo está formatado (útil em CI).               |
| `npm run check`        | Corre `type-check`, `lint` e `format:check` em sequência.    |

## Qualidade de código: lint e formatação

O projeto separa as duas responsabilidades:

- **ESLint** (`eslint.config.ts`, flat config do ESLint 9) encontra erros e más práticas.
- **Prettier** (`.prettierrc.json`) trata só da formatação. O ESLint não tem regras de
  formatação, por isso as duas ferramentas não entram em conflito.

### Configuração do ESLint

| Camada     | Pacote                                                       | Para quê                                                                                                         |
| ---------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Vue        | `eslint-plugin-vue` → `flat/recommended`                     | Boas práticas e legibilidade dos templates (`v-for` com `key`, ordem de atributos, props e eventos declarados…). |
| TypeScript | `@vue/eslint-config-typescript` → `vueTsConfigs.recommended` | Regras recomendadas do `typescript-eslint` em `.ts` e no `<script lang="ts">` dos `.vue`.                        |
| Prettier   | `@vue/eslint-config-prettier/skip-formatting`                | Desliga as regras de estilo, que ficam a cargo do Prettier.                                                      |

Regras próprias do projeto (bloco `app/custom-rules`), escolhidas para reforçar a arquitetura MVC:

- `vue/component-api-style: script-setup`: todos os componentes usam `<script setup>`.
- `vue/require-explicit-emits` e `vue/define-macros-order`: as Views declaram e tipam todos os
  eventos que emitem, com `defineProps` antes de `defineEmits`.
- `vue/block-order`: blocos sempre pela ordem `script` → `template` → `style`.
- `vue/no-unused-refs`, `vue/no-useless-v-bind`, `vue/prefer-true-attribute-shorthand`: templates
  mais limpos.
- `@typescript-eslint/consistent-type-imports`: obriga a usar `import type`, para os tipos do Model
  nunca entrarem no bundle.
- `vue/multi-word-component-names`: ativa, com exceção de `Badge` (nome exigido pela especificação).
- `eqeqeq`, `prefer-const`, `no-debugger` e `no-console` (só `console.warn`/`console.error`).

Para ignorar uma regra num caso pontual, usar um comentário com justificação:

```ts
// eslint-disable-next-line no-console -- log temporário de diagnóstico
console.log(estado)
```

### Prettier e editor

- `.prettierrc.json`: sem ponto e vírgula, aspas simples, linhas até 100 colunas e vírgulas finais.
- `.editorconfig`: indentação de 2 espaços, UTF-8 e quebras de linha LF em qualquer editor.
- `.vscode/extensions.json`: o VS Code sugere as extensões Vue (Volar), ESLint, Prettier e
  EditorConfig ao abrir o projeto.

Na primeira vez, depois de `npm install`, corra `npm run format` para alinhar todos os ficheiros
com o Prettier e depois `npm run check`.

## Arquitetura MVC

| Camada         | Pasta              | Responsabilidade                                                                                                                                                                                                                                         |
| -------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model**      | `src/models/`      | `types.ts` define os contratos (menu, biografia, percurso, competências, hobbies, modal, rodapé). `portfolioData.ts` é a fonte única de conteúdo — **nenhuma View tem texto hardcoded**.                                                                 |
| **View**       | `src/components/`  | Componentes declarativos que só recebem `props` e emitem eventos. `layout/` (Header, Footer, MenuMobile), `sections/` (Hero, About, Skills, Hobbies), `common/` (BaseModal, SocialLinks, Badge, TimelineItem, SectionHeader, ImagePlaceholder, AppIcon). |
| **Controller** | `src/composables/` | `useNavigation.ts` (scroll spy com `IntersectionObserver`, smooth scroll, menu mobile), `useModal.ts` (abrir/fechar, `overflow-hidden` no body, tecla Escape, devolução de foco), `useScrollLock.ts` (bloqueio de scroll partilhado entre menu e modal). |

`App.vue` é o _composition root_: liga o Model às Views através dos Controllers.

```text
src/
├── assets/
│   ├── styles/main.css          # design tokens + utilitários globais
│   ├── icons/index.ts           # ícones SVG (menu, fechar, utilizador, imagem, WhatsApp)
│   └── images/hobbies/          # fotografias dos cartões de hobbies
├── composables/
│   ├── useNavigation.ts
│   ├── useModal.ts
│   └── useScrollLock.ts
├── models/
│   ├── portfolioData.ts
│   └── types.ts
├── components/
│   ├── common/   BaseModal · SocialLinks · Badge · TimelineItem · SectionHeader · ImagePlaceholder · AppIcon
│   ├── layout/   AppHeader · AppFooter · MenuMobile
│   └── sections/ HeroSection · AboutSection · SkillsSection · HobbiesSection
├── App.vue
└── main.ts
```

Ficheiros de configuração na raiz:

```text
eslint.config.ts     # ESLint 9 (flat config) — Vue + TypeScript
.prettierrc.json     # regras de formatação
.prettierignore      # ficheiros que o Prettier não toca
.editorconfig        # indentação, charset e fim de linha
.vscode/             # extensões recomendadas para o VS Code
vite.config.ts       # Vite + alias @ → src/
tsconfig.json        # TypeScript (strict)
```
