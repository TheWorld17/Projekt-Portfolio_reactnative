import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { saveData, loadData } from '../utils/storage';

const STORAGE_KEY = '@profile';

export interface Profile {
  name: string;
  bio: string;
  skills: string[];
}

const defaultProfile: Profile = {
  name: 'Roman Vykeryk',
  bio: 'Hybrid specialist in web development and network engineering. Building landing pages and Cisco network simulations.',
  skills: [
    'React Native',
    'React',
    'TypeScript',
    'Cisco Packet Tracer',
    'MikroTik',
    'Linux',
    'VLAN',
    'OSPF',
    'HTML/CSS',
    'Tailwind',
  ],
};

interface ProfileContextType {
  profile: Profile;
  updateProfile: (profile: Profile) => void;
  isLoading: boolean;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  updateProfile: () => {},
  isLoading: true,
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await loadData<Profile>(STORAGE_KEY);
      if (stored) {
        setProfile(stored);
      }
      setIsLoading(false);
      setIsInitialized(true);
    })();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveData(STORAGE_KEY, profile);
    }
  }, [profile, isInitialized]);

  const updateProfile = useCallback((newProfile: Profile) => {
    setProfile(newProfile);
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
