import express from 'express';
// import mysql from 'mysql';
// import cors from 'cors';
import config from './config/default.json';
import advertRoutes from './routes/advert-routes';
import userRoutes from './routes/auth-routes';

const PORT = config.port || 5000;

const app = express();

// app.use(cors());
app.use(express.json({ extended: true }));
app.use('/api/auth', userRoutes);
app.use('/api/advert', advertRoutes);

function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is started on port ${PORT}`);
    });
  } catch (e) {
    console.log('Error: ', e);
    process.exit(1);
  }
}

start();
