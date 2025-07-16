export interface ResponseAdditionalInformation {
  id: string; 
  created_at: string; 
  logo_url?: string | null; 
  whatsapp?: string | null; 
  social_links?: string[] | null; 
  user_id: string;
  additional_description?: string | null;
  brand_information_url?: string | null;  
}

export interface CreateAdditionalInformationInput {
  logo_url?: string | null;
  whatsapp?: string | null;
  social_links?: string[] | null;
  user_id: string;
  additional_description?: string | null;
  brand_information_url?: string | null; 
}