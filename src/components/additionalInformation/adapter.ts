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

