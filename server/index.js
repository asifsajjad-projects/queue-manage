import path from 'path';
import express from 'express';
import fs from 'fs';
import { createRequire } from 'module';
import adminApi from './routes/adminApi.js';
import userApi from './routes/userApi.js';

const require = createRequire(import.meta.url);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Static builds
app.use('/static/admin', express.static(path.resolve(process.cwd(), 'dist', 'admin')));
app.use('/static/user', express.static(path.resolve(process.cwd(), 'dist', 'user')));

// API routers
app.use('/api/admin', adminApi);
app.use('/api/user', userApi);

// SSR render helpers
function renderHTML(templatePath, containerId, appString) {
  const template = fs.readFileSync(templatePath, 'utf8');
  return template.replace(`<!-- APP -->`, `<div id="${containerId}">${appString}</div>`);
}

// Admin server-side entry
app.get('/admin', async (req, res, next) => {
  try {
    // Load CommonJS server bundle using createRequire (webpack outputs CJS)
  const AdminApp = require(path.resolve('dist', 'admin', 'server.bundle.cjs')).default;
    const appHtml = AdminApp.render();
    const html = renderHTML(path.resolve('dist', 'admin', 'index.html'), 'root', appHtml);
    res.send(html);
  } catch (err) {
    next(err);
  }
});

// User server-side entry
app.get('/user', async (req, res, next) => {
  try {
  const UserApp = require(path.resolve('dist', 'user', 'server.bundle.cjs')).default;
    const appHtml = UserApp.render();
    const html = renderHTML(path.resolve('dist', 'user', 'index.html'), 'root', appHtml);
    res.send(html);
  } catch (err) {
    next(err);
  }
});

// simple health
app.get('/health', (req, res) => res.json({ ok: true }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log('Admin dashboard: http://localhost:' + port + '/admin');
  console.log('User dashboard: http://localhost:' + port + '/user');
});
