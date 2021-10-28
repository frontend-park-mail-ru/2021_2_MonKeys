import typescript from '@rollup/plugin-typescript';

export default {
  input: 'source/app.ts',
  output: {
    file: 'static/js/app.min.js'
  },
  plugins: [typescript()]
};