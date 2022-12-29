/*
 * @Author: Wcy1998 cywu3@leqee.com
 * @Date: 2022-03-23 10:26:34
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @LastEditTime: 2022-05-30 15:47:40
 * @FilePath: \json2htmltest\rollup.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup'

export default [
  {
    input: './src/index.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].cjs.js',
    },
    plugins: [ resolve(),commonjs(),typescript(),terser(),cleanup()],
  }, {
    input: './src/index.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].esm.mjs',
    },
    plugins: [resolve(), commonjs(), typescript(),terser(),cleanup()],
  },
   {
    input: './src/index.ts',
    output: {
      dir: 'dist',
      format: 'umd',
      name: 'MAI_DIAN' ,
      entryFileNames: '[name].umd.js',
    },
    plugins: [resolve(), commonjs(), typescript()],
  },
];
