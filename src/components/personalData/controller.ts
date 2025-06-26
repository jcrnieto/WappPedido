import { Request, Response } from 'express';
import { createPersonalDataAdapter } from './adapter';


export const createPersonalDataController = async (req: Request, res: Response): Promise<void> => {
  const {
    id,
    full_name,
    phone,
    address,
    city,
    brand_name,
  } = req.body;
  console.log('Datos recibidos:', JSON.stringify(req.body, null, 2));
  try {

    const slug = brand_name.trim().toLowerCase().replace(/\s+/g, '-'); 
    const public_url = `/${slug}`;
    const admin_url = `/admin/${slug}`;

    const { data, error } = await createPersonalDataAdapter({
      id,
      full_name,
      phone,
      address,
      city,
      brand_name,
      public_url,
      admin_url
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

