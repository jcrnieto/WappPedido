import { supabaseAdmin, supabase } from '../../config/supabaseConfig';
import { PersonalDataInput, PersonalDataResponse } from './type';

export const createPersonalDataAdapter = async (input: PersonalDataInput) : Promise<{ data: PersonalDataResponse | null; error: Error | null }> => {
  const { latitude, longitude } = input.location;

  const { data, error } = await supabaseAdmin
    .from('personaldata')
    .insert([
      {
        ...input,
        location: `POINT(${longitude} ${latitude})`
      }
    ])
    .select()
    .single();

  return { data, error };
};

