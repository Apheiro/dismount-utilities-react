import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';

const config: RollupOptions = {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/library.es.js',

      format: 'es',
    },
    {
      file: 'dist/library.js',
      format: 'cjs',
    },
  ],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  plugins: [
    alias({
      entries: [{ find: '@/*', replacement: 'src' }],
    }),
    typescript({
      declaration: true,
      declarationDir: 'dist/types',
      exclude: ['./rollup.config.ts'],
    }),
    terser(),
    resolve(),
  ],
};

export default config;
