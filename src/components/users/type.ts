export interface Users {
  id: number;
  email: string;
  password: string;
}

export interface SimplifiedUser {
  id: string;
  email: string;
  created_at: string;
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