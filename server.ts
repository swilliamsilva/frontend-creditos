import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine'; 
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { AppServerModule } from './src/main.server';

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/frontend-creditos/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) 
    ? 'index.original.html'
    : 'index.html';

  server.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));
  server.set('view engine', 'html');
  server.set('views', distFolder);
  server.get('*.*', express.static(distFolder, { maxAge: '1y' }));
  server.get('*', (req, res) => res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] }));
  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => console.log(`Node Express server listening on http://localhost:${port}`));
}

declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule?.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) run();
export * from './src/main.server';