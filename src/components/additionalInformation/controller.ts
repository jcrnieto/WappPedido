import { Request, Response } from 'express';
import { createAdditionalInformationAdapter, 
  getAdditionalInformationByUserAdapter, 
  updateAdditionalInformationAdapter,
  removeLogoAdapter,
  removeBrandAdapter 
} from './adapter';
import { CreateAdditionalInformationInput, ResponseAdditionalInformation } from './type';

export const createAdditionalInformationController = async (
  req: Request<{}, {}, CreateAdditionalInformationInput>,
  res: Response<ResponseAdditionalInformation | { message: string }>
): Promise<void> => {
  try {
    const { logo_url, whatsapp, social_links, user_id, additional_description, brand_information_url } = req.body;

    if (!user_id) {
      res.status(400).json({ message: 'El campo user_id es obligatorio.' });
      return;
    }

    const { data, error } = await createAdditionalInformationAdapter({
      logo_url,
      whatsapp,
      social_links,
      user_id,
      additional_description,
      brand_information_url
    });

    if (error) {
      console.error('❌ Error al guardar la información adicional:', error);
      res.status(500).json({ message: 'Error al guardar información adicional.' });
      return;
    }

    res.status(201).json(data || { message: 'Información adicional guardada correctamente.' });
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const getAdditionalInformationByUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      res.status(400).json({ message: 'Falta el parámetro user_id' });
      return;
    }

    const { data, error } = await getAdditionalInformationByUserAdapter(user_id);

    if (error) {
      console.error('❌ Error al obtener info adicional:', error);
      res.status(500).json({ message: 'Error al obtener información adicional' });
      return;
    }

    if (!data) {
      res.status(404).json({ message: 'Información no encontrada para este usuario' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const updateAdditionalInformationController = async (
  req: Request<{ user_id: string }, {}, CreateAdditionalInformationInput>,
  res: Response
): Promise<void> => {
  try {
    const { user_id } = req.params;
    const { logo_url, whatsapp, social_links, additional_description, brand_information_url } = req.body;

    if (!user_id) {
      res.status(400).json({ message: 'Falta el parámetro user_id' });
      return;
    }

    const { data, error } = await updateAdditionalInformationAdapter(user_id, {
      logo_url,
      whatsapp,
      social_links,
      additional_description,
      brand_information_url
    });

    if (error) {
      console.error('❌ Error al actualizar info adicional:', error);
      res.status(500).json({ message: 'Error al actualizar información adicional' });
      return;
    }

    res.status(200).json(data || { message: 'Información actualizada correctamente.' });
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const removeLogoController = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = req.params;

  if (!user_id) {
    res.status(400).json({ message: 'Falta el parámetro user_id' });
    return;
  }

  try {
    // 1. Obtener la información actual
    const { data, error } = await getAdditionalInformationByUserAdapter(user_id);

    if (error) {
      console.error('❌ Error buscando información adicional:', error);
      res.status(500).json({ message: 'Error buscando información adicional' });
      return;
    }

    if (!data?.logo_url) {
      res.status(404).json({ message: 'No existe logo para eliminar' });
      return;
    }

    // 2. Llamar al adapter que borra del storage y actualiza la BD
    const { success, error: deleteError } = await removeLogoAdapter(data.logo_url, user_id);

    if (deleteError || !success) {
      console.error('❌ Error al eliminar logo:', deleteError);
      res.status(500).json({ message: 'Error al eliminar el logo' });
      return;
    }

    res.status(200).json({ message: 'Logo eliminado correctamente' });
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const removeBrandController = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = req.params;

  if (!user_id) {
    res.status(400).json({ message: 'Falta el parámetro user_id' });
    return;
  }

  try {
    // 1. Obtener la información actual
    const { data, error } = await getAdditionalInformationByUserAdapter(user_id);

    if (error) {
      console.error('❌ Error buscando información adicional:', error);
      res.status(500).json({ message: 'Error buscando información adicional' });
      return;
    }

    if (!data?.brand_information_url) {
      res.status(404).json({ message: 'No existe foto de informacion para eliminar' });
      return;
    }

    // 2. Llamar al adapter que borra del storage y actualiza la BD
    const { success, error: deleteError } = await removeBrandAdapter(data.brand_information_url, user_id);

    if (deleteError || !success) {
      console.error('❌ Error al eliminar foto de informacion:', deleteError);
      res.status(500).json({ message: 'Error al eliminar foto' });
      return;
    }

    res.status(200).json({ message: 'foto de informacion eliminado correctamente' });
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
