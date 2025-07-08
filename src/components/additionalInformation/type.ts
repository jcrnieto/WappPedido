export interface ResponseAdditionalInformation {
  id: string; 
  created_at: string; 
  logo_url?: string | null; 
  whatsapp?: string | null; 
  social_links?: string[] | null; 
  user_id: string; 
}

export interface CreateAdditionalInformationInput {
  logo_url?: string | null;
  whatsapp?: string | null;
  social_links?: string[] | null;
  user_id: string; 
}