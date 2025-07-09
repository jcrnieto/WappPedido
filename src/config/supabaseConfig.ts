// import { createClient } from '@supabase/supabase-js';
// import 'dotenv/config';

// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseKey = process.env.SUPABASE_ANON_KEY!;
// const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// console.log('Supabase URL:', supabaseUrl);

// export const supabase = createClient(supabaseUrl, supabaseKey);
// export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
// const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// // Log para debug en Railway
// console.log('Supabase URL:', supabaseUrl);
// console.log('Service Role Key loaded:', !!supabaseServiceRoleKey);

// // Validación para evitar errores tontos
// if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
//   throw new Error('❌ Supabase environment variables are missing');
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Cargamos variables solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Supabase URL:', supabaseUrl);
console.log('🔍 Service Role Key loaded:', !!supabaseServiceRoleKey);

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  throw new Error('❌ Supabase environment variables are missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

