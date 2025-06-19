import { supabaseAdmin, supabase } from '../../config/supabaseConfig';
//import { Users } from './type';


export const getUsersAdapter = async () => {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    throw new Error(`Error al obtener usuarios: ${error.message}`);
  }
//   console.log('Respuesta de Supabase listUsers:', data)
  
  const users = data.users.map((user) => ({
    id: user.id,
    email: user.email,
    created_at: user.created_at
  }));
  return users;
};

export const registerAdapter = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password });
};

export const loginAdapter = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};