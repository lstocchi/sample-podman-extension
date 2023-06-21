// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: {
    'extension': 'src/extension.ts',
    'thread': 'node_modules/hasha/thread.js',
  } ,
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
  },
  external: [
    '@podman-desktop/api',
  ],
  plugins: [
    typescript({ noEmitOnError: true }),
    commonjs({ extensions: ['.js', '.ts'] }), // the ".ts" extension is required],
    json(),
    nodeResolve({preferBuiltins: true}),
  ],
};
