# Queue Manage - SSR Boilerplate

This project provides a minimal Express + React server-side rendering (SSR) boilerplate with two separate React apps:

- Admin dashboard: packages/admin
- User dashboard: packages/user

Each dashboard has its own build and is served at different endpoints:

- /admin -> admin SSR render
- /user -> user SSR render

APIs:

- /api/admin/*
- /api/user/*

Quick start:

1. Install deps:

```bash
npm install
```

2. Build both apps:

```bash
npm run build
```

3. Start server:

```bash
npm start
```

Visit http://localhost:3000/admin and http://localhost:3000/user

Notes:

- This is a development-oriented boilerplate. Adjust webpack mode and optimizations for production.
- Server-side bundles are emitted into `dist/admin/server.bundle.js` and `dist/user/server.bundle.js`.
