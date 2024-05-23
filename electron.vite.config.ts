import cp from 'vite-plugin-cp'
import path, { resolve } from 'node:path'
import { builtinModules } from 'module';
import { PluginOption, Plugin } from 'vite';
import nodeResolve from '@rollup/plugin-node-resolve';
import fs from 'node:fs';

const external = ['silk-wasm', 'ws', 'express', 'uuid', 'fluent-ffmpeg', 'sqlite3', 'log4js',
  'qrcode-terminal'];

const nodeModules = [...builtinModules, builtinModules.map(m => `node:${m}`)].flat();

function genCpModule(module: string) {
  return { src: `./node_modules/${module}`, dest: `out/node_modules/${module}`, flatten: false }
}
const baseConfigPlugin: PluginOption[] = [
  cp({
    targets: [
      { src: './src/napcat.json', dest: 'out/main/config/' },
      { src: './static/', dest: 'out/main/static/', flatten: false },
      { src: './src/onebot11/onebot11.json', dest: 'out/main/config/' },
      { src: './package.json', dest: 'out' },
      { src: './README.md', dest: 'out' },
      { src: './logo.png', dest: 'out' },
    ]
  }),
  nodeResolve(),
];

let corePath = resolve(__dirname, './src/core/src');
if (!fs.existsSync(corePath)) {
  corePath = resolve(__dirname, './src/core.lib/src');
}

let config = {
  main: {
    build: {
      outDir: 'out/main',
      emptyOutDir: true,
      lib: {
        formats: ['cjs'],
        entry: { main: 'src/liteloader/main.ts' },
      },
      rollupOptions: {
        external,
        input: 'src/liteloader/main.ts',
      },
    },
    resolve: {
      conditions: ['node', 'default'],
      alias: {
        '@/core': corePath,
        '@': resolve(__dirname, './src'),
        './lib-cov/fluent-ffmpeg': './lib/fluent-ffmpeg',
      },
    },
    plugins: [
      ...baseConfigPlugin,
      cp({
        targets: [
          ...external.map(genCpModule),
          { src: './manifest.json', dest: 'out' },
        ],
      })
    ],
  },
  preload: {
    // vite config options
    build: {
      outDir: 'out/preload',
      emptyOutDir: true,
      lib: {
        formats: ['cjs'],
        entry: { preload: 'src/liteloader/preload.ts' },
      },
      rollupOptions: {
        // external: externalAll,
        input: 'src/liteloader/preload.ts',
      },
    },
    resolve: {},
  },
  renderer: {
    // vite config options
    build: {
      outDir: 'out/renderer',
      emptyOutDir: true,
      lib: {
        formats: ['es'],
        entry: { renderer: 'src/liteloader/renderer.ts' },
      },
      rollupOptions: {
        // external: externalAll,
        input: 'src/liteloader/renderer.ts',
      },
    },
    resolve: {},
  },
}

export default config

function obfuscator(arg0: { options: { compact: boolean; controlFlowFlattening: boolean; controlFlowFlatteningThreshold: number; deadCodeInjection: boolean; deadCodeInjectionThreshold: number; debugProtection: boolean; disableConsoleOutput: boolean; identifierNamesGenerator: string; log: boolean; renameGlobals: boolean; rotateStringArray: boolean; selfDefending: boolean; stringArray: boolean; stringArrayEncoding: string[]; stringArrayThreshold: number; transformObjectKeys: boolean; unicodeEscapeSequence: boolean; }; include: string[]; }): Plugin {
  throw new Error('Function not implemented.');
}
