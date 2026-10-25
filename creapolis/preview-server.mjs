import http from 'http';
import fs from 'fs';
import path from 'path';

const DIST = path.resolve(process.argv[2] || 'dist');
const PORT = parseInt(process.argv[3] || '4321', 10);

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(DIST, decodeURIComponent(req.url.split('?')[0]));
  if (filePath.endsWith('/')) filePath += 'index.html';
  // Directory without trailing slash (e.g. /es/servicios) → serve its index
  try {
    if (fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
  } catch {
    // not found — fall through to 404 handling below
  }
  if (!fs.existsSync(filePath)) filePath = path.join(DIST, '404', 'index.html');
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => console.log(`Preview at http://localhost:${PORT}`));
