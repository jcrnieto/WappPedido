import { supabaseAdmin } from '../../config/supabaseConfig'; 
import { CreateAdditionalInformationInput, ResponseAdditionalInformation } from './type';

export const createAdditionalInformationAdapter = async (
  info: CreateAdditionalInformationInput
): Promise<{ data: ResponseAdditionalInformation | null; error: any }> => {
  const { data, error } = await supabaseAdmin
    .from('additional_information_wapppedidos')
    .insert([
      {
        logo_url: info.logo_url,
        whatsapp: info.whatsapp,
        social_links: info.social_links,
        user_id: info.user_id,
        additional_description: info.additional_description,
        brand_information_url: info.brand_information_url
      },
    ])
    .select();

  return { data: data?.[0] ?? null, error }
};

export const getAdditionalInformationByUserAdapter = async (
  user_id: string
): Promise<{ data: ResponseAdditionalInformation | null; error: any }> => {
  const { data, error } = await supabaseAdmin
    .from('additional_information_wapppedidos')
    .select('*')
    .eq('user_id', user_id)
    .maybeSingle();

  return { data, error };
};

export const updateAdditionalInformationAdapter = async (
  user_id: string,
  info: Partial<CreateAdditionalInformationInput>
): Promise<{ data: ResponseAdditionalInformation | null; error: any }> => {
  const { data, error } = await supabaseAdmin
    .from('additional_information_wapppedidos')
    .update({
      logo_url: info.logo_url,
      whatsapp: info.whatsapp,
      social_links: info.social_links,
      additional_description: info.additional_description,
      brand_information_url: info.brand_information_url
    })
    .eq('user_id', user_id)
    .select()
    .single();

  return { data, error };
};

export const removeLogoAdapter = async (
  logoUrl: string,
  user_id: string
): Promise<{ success: boolean; error: any }> => {
  try {
    // --- Detectar bucket y file path dinámicamente ---
    // Ejemplo URL: https://<instancia>.supabase.co/storage/v1/object/public/logos/mi-imagen.png
    const publicIndex = logoUrl.indexOf('/object/public/');
    if (publicIndex === -1) {
      return { success: false, error: new Error('URL inválida de Supabase') };
    }

    const path = logoUrl.substring(publicIndex + '/object/public/'.length); 

    const [bucket, ...filePathParts] = path.split('/');
    const filePath = filePathParts.join('/');

    // --- 1. Eliminar archivo del Storage ---
    const { error: storageError } = await supabaseAdmin.storage
      .from(bucket)
      .remove([filePath]);

    if (storageError) {
      console.error('❌ Error al borrar del storage:', storageError);
      return { success: false, error: storageError };
    }

    // --- 2. Actualizar BD (logo_url a null) ---
    const { error: updateError } = await supabaseAdmin
      .from('additional_information_wapppedidos')
      .update({ logo_url: null })
      .eq('user_id', user_id);

    if (updateError) {
      console.error('❌ Error al actualizar logo_url a null:', updateError);
      return { success: false, error: updateError };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('❌ Error inesperado en removeLogoAdapter:', err);
    return { success: false, error: err };
  }
};

export const removeBrandAdapter = async (
  brandUrl: string,
  user_id: string
): Promise<{ success: boolean; error: any }> => {
  try {
    // --- Detectar bucket y file path dinámicamente ---
    // Ejemplo URL: https://<instancia>.supabase.co/storage/v1/object/public/logos/mi-imagen.png
    const publicIndex = brandUrl.indexOf('/object/public/');
    if (publicIndex === -1) {
      return { success: false, error: new Error('URL inválida de Supabase') };
    }

    const path = brandUrl.substring(publicIndex + '/object/public/'.length); 

    const [bucket, ...filePathParts] = path.split('/');
    const filePath = filePathParts.join('/');

    // --- 1. Eliminar archivo del Storage ---
    const { error: storageError } = await supabaseAdmin.storage
      .from(bucket)
      .remove([filePath]);

    if (storageError) {
      console.error('❌ Error al borrar del storage:', storageError);
      return { success: false, error: storageError };
    }

    // --- 2. Actualizar BD (logo_url a null) ---
    const { error: updateError } = await supabaseAdmin
      .from('additional_information_wapppedidos')
      .update({ brand_information_url: null })
      .eq('user_id', user_id);

    if (updateError) {
      console.error('❌ Error al actualizar brand_information_url a null:', updateError);
      return { success: false, error: updateError };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('❌ Error inesperado en removeLogoAdapter:', err);
    return { success: false, error: err };
  }
};

