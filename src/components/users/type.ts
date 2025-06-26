export interface Users {
  id: number;
  email: string;
  password: string;
}

export interface PersonalData {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  brand_name: string;
  opening_hours: string;
  public_url: string;
  admin_url: string;
  created_at: string;
}

export interface SimplifiedUser {
  id: string;
  email: string;
  created_at: string;
  profile_completed?: boolean;
  personalData: PersonalData | null;
}







export interface LoginResponse {
  data: {
    session: {
      access_token: string;
      refresh_token: string;
    } | null;
    user: {
      id: string;
      email: string;
    } | null;
  };
  error: Error | null;
}