// server.ts
import express, { Request, Response } from 'express';
import userRoutes from './components/users/route';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola mundo desde Express!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
