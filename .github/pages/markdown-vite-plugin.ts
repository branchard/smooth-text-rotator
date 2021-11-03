import type {Plugin} from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import {parse} from 'marked';
import {default as hljs} from 'highlight.js' // TODO: maybe use Shiki or the GitHub syntax highlighter

// TODO: move this plugin in its own repo

const tagRegex = /<%- include\(['"](.*)['"]\); %>/gm;

export function markdownVitePlugin(): Plugin {
  return {
    name: 'markdown',
    enforce: 'pre',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html: string, context) {
        return html.replace(tagRegex, (match, captured) => {
          const markdownFilePath = path.join(path.parse(context.filename).dir, captured);
          const markdownFileContent = fs.readFileSync(markdownFilePath).toString()
          return parse(markdownFileContent, {
            highlight(code, language) {
              return hljs.highlight(code, {language}).value
            }
          });
        });
      }
    }
  }
}
