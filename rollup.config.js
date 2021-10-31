import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';


export default {
  input: 'source/app.ts',
  output: [
    {
      file: 'static/js/app.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
    ],
  
  plugins: [typescript()]
};