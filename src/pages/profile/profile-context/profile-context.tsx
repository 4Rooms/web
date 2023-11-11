import { createContext, Dispatch, SetStateAction } from "react";

interface ProfileContextType {
    profileSection: string;
    setProfileSection: Dispatch<SetStateAction<string>>;
}

export const ProfileContext = createContext<ProfileContextType>(
    {} as ProfileContextType
  );
