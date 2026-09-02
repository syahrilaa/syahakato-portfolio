'use client';
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes';
import React, { createContext, use, useEffect, useMemo, useRef } from 'react';
import type { UseThemeProps, ThemeProviderProps as NextThemeProviderProps } from 'next-themes';

export type ThemeRegistry = Record<string, UseThemeProps>;
export type ThemeContextKey = 'app-settings' | 'editor' | 'code' | 'components' | (string & {});

export interface MultiThemeRegistryValue {
  themes: React.RefObject<ThemeRegistry>;
  activeContexts: string[];
}

export const MultiThemeRegistryContext = createContext<MultiThemeRegistryValue>({
  themes: { current: {} },
  activeContexts: [],
});

export interface ScopedThemeProviderProps extends Omit<NextThemeProviderProps, 'storageKey'> {
  children: React.ReactNode;
  context: ThemeContextKey;
  resolveDefaultTheme?: (context: ThemeContextKey, parentRegistry: MultiThemeRegistryValue) => string;
}

export const ScopedThemeProvider: React.FC<ScopedThemeProviderProps> = ({
  context,
  attribute = ['class', 'data-theme'],
  value,
  defaultTheme = 'dark',
  resolveDefaultTheme,
  children,
  ...props
}) => {
  const storageKey = `_${context}.appearance-theme`;
  const parentRegistry = use(MultiThemeRegistryContext);
  const themesRef = useRef<ThemeRegistry>(parentRegistry.themes.current);

  const computedDefaultTheme = useMemo(() => {
    if (defaultTheme) return defaultTheme;

    if (resolveDefaultTheme) {
      return resolveDefaultTheme(context, parentRegistry);
    }

    switch (context) {
      case 'editor':
      case 'app-settings':
      case 'code':
        return 'dark';
      default:
        return 'system';
    }
  }, [defaultTheme, resolveDefaultTheme, context, parentRegistry]);

  const resolvedValue = useMemo(() => {
    if (value) return value;

    if (context === 'app-settings') {
      return undefined;
    }

    return {
      light: `${context}-light`,
      dark: `${context}-dark`,
    };
  }, [context, value]);

  const registryValue = useMemo(
    () => ({
      themes: themesRef,
      activeContexts: [...parentRegistry.activeContexts, context],
    }),
    [parentRegistry.activeContexts, context]
  );

  return (
    <MultiThemeRegistryContext value={registryValue}>
      <NextThemeProvider
        value={resolvedValue}
        attribute={attribute}
        storageKey={storageKey}
        defaultTheme={computedDefaultTheme}
        enableSystem
        enableColorScheme
        disableTransitionOnChange
        {...props}
      >
        <ThemeRegistrar contextName={context}>{children}</ThemeRegistrar>
      </NextThemeProvider>
    </MultiThemeRegistryContext>
  );
};

const ThemeRegistrar: React.FC<{ contextName: string; children: React.ReactNode }> = ({ contextName, children }) => {
  const nextThemeProps = useNextTheme();
  const registry = use(MultiThemeRegistryContext);

  useEffect(() => {
    registry.themes.current[contextName] = nextThemeProps;
    return () => {
      delete registry.themes.current[contextName];
    };
  }, [contextName, nextThemeProps, registry]);

  return <React.Fragment>{children}</React.Fragment>;
};
