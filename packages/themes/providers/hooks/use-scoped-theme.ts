'use client';
import { useTheme as useNextTheme } from 'next-themes';
import { use } from 'react';
import { MultiThemeRegistryContext } from '../theme-provider';
import type { ThemeContextKey } from '../theme-provider';

export function useScopedTheme(context?: ThemeContextKey) {
  const registry = use(MultiThemeRegistryContext);
  const defaultNextTheme = useNextTheme();

  if (!context) {
    return defaultNextTheme;
  }

  const scopedTheme = registry.themes.current[context];

  if (!scopedTheme) {
    throw new Error(
      `[useScopedTheme] Context '${context}' not found!. Make sure the component is wrapped with ScopedThemeProvider.`
    );
  }

  return scopedTheme;
}
