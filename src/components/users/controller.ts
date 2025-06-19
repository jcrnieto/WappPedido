import { Request, Response } from 'express';
import { registerAdapter, loginAdapter, getUsersAdapter } from './adapter';

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsersAdapter();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

export const registerUserController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const { data, error } = await registerAdapter(email, password);

    if (error) {
       res.status(400).json({ error: error.message });
    }

    res.status(201).json({ user: data.user });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const { data, error } = await loginAdapter(email, password);

    if (error) {
       res.status(400).json({ error: error.message });
    }

    res.status(200).json({ session: data.session, user: data.user });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

