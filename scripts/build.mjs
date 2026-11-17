import {readFile,writeFile} from 'node:fs/promises';
import {build} from 'esbuild';
await build({entryPoints:['experience.mjs'],bundle:true,minify:true,legalComments:'eof',format:'esm',outfile:'public/app.js'});
await build({entryPoints:['src.mjs'],bundle:true,minify:true,legalComments:'eof',format:'esm',outfile:'public/passes.js'});
await build({entryPoints:['worker.mjs'],bundle:true,minify:true,legalComments:'eof',format:'esm',outfile:'public/worker.js'});

for(const path of ['public/app.js','public/passes.js','public/worker.js'])await writeFile(path,(await readFile(path,'utf8')).replace(/[ \t]+$/gm,''));
