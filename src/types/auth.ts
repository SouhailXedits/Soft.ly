export interface LoginResult {
  token: string;
}

export interface ValidateTokenResult {
  validateToken: {
    id: string;
    role: string;
    LinksCount: string;
    email: string;
  };
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface User {
  id: string;
  role: string;
  LinksCount: string;
  email: string;
}

export interface UserRowProps {
  user: User;
  selectedUsers: string[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
}
