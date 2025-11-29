import app from './app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log('Admin dashboard: http://localhost:' + port + '/admin');
  console.log('User dashboard: http://localhost:' + port + '/user');
});
