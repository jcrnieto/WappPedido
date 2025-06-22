import morgan from 'morgan';
import express, { Request, Response } from 'express';
import userRoutes from './components/users/route';
import personalDataRoutes from './components/personalData/route';


const app = express();
const PORT = 3000;


app.use(express.json());
app.use(morgan('dev'));
app.use('/api/users', userRoutes);
app.use('/api/personalData', personalDataRoutes); 

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola mundo desde Express!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
