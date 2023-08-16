export const createConfig = (rules: Record<string, 'error' | 'off' | 'warn'>) => ({
  plugins: ['testing'],
  rules,
});