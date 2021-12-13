import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'


export default {
  input: 'source/app.ts',
  output: 
    {
      file: 'static/js/app.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ,

  plugins: [scss({
    processor: () => postcss([autoprefixer()]),
    include: ["/**/*.css", "/**/*.scss", "/**/*.sass"],
    output: 'static/css/main.css',
    failOnError: true,
    outputStyle: 'compressed'
  }),typescript()]
};
