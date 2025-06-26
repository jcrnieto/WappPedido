import { supabaseAdmin, supabase } from '../../config/supabaseConfig';
import { PersonalDataInput, PersonalDataResponse } from './type';

export const createPersonalDataAdapter = async (input: PersonalDataInput) : Promise<{ data: PersonalDataResponse | null; error: Error | null }> => {

  const { data, error } = await supabaseAdmin
    .from('personal_data')
    .insert([
      {
        ...input,
      }
    ])
    .select()
    .single();

  // ✅ Actualizar profile_completed a true
  const { error: updateError } = await supabaseAdmin
    .from('users_wapppedidos')
    .update({ profile_completed: true })
    .eq('id', input.id); 
  if (updateError) {
    console.error('❌ Error actualizando profile_completed:', updateError);
  }

  return { data, error };
};

