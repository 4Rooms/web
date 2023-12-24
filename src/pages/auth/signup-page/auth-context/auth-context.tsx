import {
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  username: string | null;
  setUsername: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
