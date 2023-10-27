import React, { ReactNode, useState } from 'react';
import { ProfileContext } from './profile-context';

export function ProfileProvider({children}: { children: ReactNode }) {
    const [profileSection, setProfileSection] = useState<string>("Edit Profile");

    return (
        <ProfileContext.Provider value={{profileSection, setProfileSection}}>
            {children}
        </ProfileContext.Provider>
    );
}