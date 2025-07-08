import { Request, Response } from 'express';
import { createPersonalDataAdapter, updatePersonalDataAdapter } from './adapter';

export const createPersonalDataController = async (req: Request, res: Response): Promise<void> => {
  const {
    user_id,
    full_name,
    phone,
    address,
    city,
    brand_name,
    auth_user_id
  } = req.body;
  console.log('Datos recibidos:', JSON.stringify(req.body, null, 2));
  try {

    const slug = brand_name.trim().toLowerCase().replace(/\s+/g, '-'); 
    const public_url = `/${slug}`;
    const admin_url = `/admin/${slug}`;

    const { data, error } = await createPersonalDataAdapter({
      user_id,
      full_name,
      phone,
      address,
      city,
      brand_name,
      public_url,
      admin_url,
      auth_user_id
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json({ personalData: data });
  } catch (err) {
    res.status(500).json({ error: 'Error en la creacion de datos peronales' });
  }
};


export const updatePersonalDataController = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;
  const { full_name, phone, address, city, brand_name } = req.body;

  if (!userId || !address || !city) {
    res.status(400).json({ message: 'Faltan campos obligatorios' });
    return;
  }

  try {
    await updatePersonalDataAdapter({ id: userId, full_name, phone, address, city, brand_name });

    res.status(200).json({ message: '✅ Datos personales actualizados con coordenadas' });
  } catch (error: any) {
    console.error('❌ Error al actualizar datos personales:', error.message);
    res.status(500).json({ message: 'Error al actualizar datos personales' });
  }
};
