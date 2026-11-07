export const icons = {
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  /** Botão "fechar" (cruz) do modal e do menu mobile — não é o logótipo do X/Twitter. */
  close: ['M18 6 6 18', 'm6 6 12 12'],
  user: ['M12 4a4 4 0 1 0 0 8 4 4 0 1 0 0-8z', 'M4 21v-1a8 8 0 0 1 16 0v1z'],
  whatsapp: [
    'M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21',
    'M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1',
  ],
  image: ['M3 5h18v14H3z', 'm3 17 5-5 4 4 3-3 6 6', 'M16 8.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2z'],
} as const satisfies Record<string, readonly string[]>

export type IconName = keyof typeof icons
