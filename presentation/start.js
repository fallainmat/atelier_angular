import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import asciidoctor from '@asciidoctor/core';
import asciidoctorRevealjs from '@asciidoctor/reveal.js';
import browserSync from 'browser-sync';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const converter = asciidoctor();
const bs = browserSync.create();
asciidoctorRevealjs.register();

const convertAsciidoc = () => {
  converter.convertFile('index.adoc', {
    safe: 'safe',
    backend: 'revealjs',
    to_dir: 'dist',
    mkdirs: true,
    attributes: {
      revealjsdir: `/dist/reveal.js`
    }
  });
  fs.cpSync('../node_modules/reveal.js', 'dist/reveal.js', {recursive: true});
  fs.cpSync('./slides/images', 'dist/images', {recursive: true});
  fs.copyFileSync('css/custom.css', 'dist/custom.css');
  fs.copyFileSync('../node_modules/highlightjs/styles/atom-one-dark.css', 'dist/atom-one-dark.css');
}
fs.rmSync(path.resolve(__dirname, 'dist'), { recursive: true, force: true })
convertAsciidoc();

bs.watch(['**/*.adoc', 'css/**.css']).on('change', () => {
  convertAsciidoc();
  bs.reload();
});

bs.init({
  server: true,
  startPath: 'dist',
  port: 8081,
  ui: false
});
