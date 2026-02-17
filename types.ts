
export interface GameCode {
  id: string;
  code: string;
  reward: string;
  isNew: boolean;
  active: boolean;
}

export interface UpdateLog {
  id: string;
  title: string;
  date: string;
  content: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
}

export interface Branding {
  logo_url: string;
  banner_url: string;
  gameplay_images: string[];
}
