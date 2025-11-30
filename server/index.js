import app from './app.js';
import { connectDb } from './db.js';

const port = process.env.PORT || 3000;

(async function start(){
  try{
    await connectDb().then(console.log('MongoDB connected'));
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
      console.log('Admin dashboard: http://localhost:' + port + '/admin');
      console.log('User dashboard: http://localhost:' + port + '/user');
    });
  }catch(err){
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
