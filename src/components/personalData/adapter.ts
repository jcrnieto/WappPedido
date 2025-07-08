import { supabaseAdmin, supabase } from '../../config/supabaseConfig';
import { PersonalDataInput, PersonalDataResponse, UpdatePersonalDataInput } from './type';
import { geocodeAddressAdapter } from '../geoLocation/adapter';


export const createPersonalDataAdapter = async (
  input: PersonalDataInput
): Promise<{ data: PersonalDataResponse | null; error: Error | null }> => {
  try {
    
    const { address, city, user_id } = input;

    const { latitude, longitude } = await geocodeAddressAdapter(address, city);

    const { data, error } = await supabaseAdmin
      .from('personal_data')
      .insert([
        {
          ...input,
          latitude,
          longitude,
        }
      ])
      .select()
      .single();

    // 4. Actualizamos el profile_completed
    const { error: updateError } = await supabaseAdmin
      .from('users_wapppedidos')
      .update({ profile_completed: true })
      .eq('id', user_id);

    if (updateError) {
      console.error('❌ Error actualizando profile_completed:', updateError);
    }

    return { data, error };
  } catch (err) {
    console.error('❌ Error general en createPersonalDataAdapter:', err);
    return { data: null, error: err as Error };
  }
};


export const updatePersonalDataAdapter = async ({
  id,
  full_name,
  phone,
  address,
  city,
  brand_name,
}: UpdatePersonalDataInput): Promise<void> => {
  const { latitude, longitude } = await geocodeAddressAdapter(address, city);

  const { error } = await supabase
    .from('personal_data')
    .update({
      full_name,
      phone,
      address,
      city,
      brand_name,
      latitude,
      longitude,
    })
    .eq('id', id);

  if (error) throw error;
};
