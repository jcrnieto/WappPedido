import { Request, Response } from 'express';
import { registerAdapter, loginAdapter, getUsersAdapter, getPersonalDataByUserAdapter, getUserByEmailAdapter } from './adapter';


export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsersAdapter();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

export const registerUserController = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const email = req.body.email?.trim().toLowerCase();
    // const password = req.body.password;

    console.log('Email recibido:', JSON.stringify(email));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      res.status(400).json({ error: 'Email inválido' });
      return;
    }

    const user = await registerAdapter(email);

    if (!user) {
      res.status(400).json({ error: 'Registro fallido' });
      return;
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await loginAdapter(email, password);

    if (!user) {
       res.status(400).json({ error: 'Su usuario o contraseña es invalido' });
       return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export const getPersonalDataByUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const { data, error } = await getPersonalDataByUserAdapter(id);

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    if (!data) {
      res.status(404).json({ error: 'No se encontraron datos personales para este usuario' });
      return;
    }

    res.status(200).json({ personalData: data });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los datos personales' });
  }
};

export const getUserByEmailController = async (req: Request, res: Response): Promise<void> => {
  const email = req.params.email?.trim().toLowerCase();

  if (!email) {
    res.status(400).json({ error: 'Email es requerido' });
    return;
  }

  try {
    const user = await getUserByEmailAdapter(email);

    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el usuario por email' });
  }
};