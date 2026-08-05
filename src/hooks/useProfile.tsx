import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  avatar: string;
  addresses: Address[];
  notifications: {
    email: boolean;
    sms: boolean;
    promotions: boolean;
    newArrivals: boolean;
  };
}

interface ProfileContextValue {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  addAddress: (addr: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, data: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  updateNotifications: (data: Partial<UserProfile['notifications']>) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);
const STORAGE_KEY = 'noctil-profile';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Alexandre Voss',
  email: 'alexandre@voss.ch',
  phone: '+41 22 000 0000',
  dateOfBirth: '1985-03-15',
  avatar: 'https://images.pexels.com/photos/8327756/pexels-photo-8327756.jpeg?auto=compress&cs=tinysrgb&w=300',
  addresses: [
    {
      id: 'addr-1',
      label: 'Home',
      street: 'Rue du Rhône 1',
      city: 'Genève',
      zip: '1204',
      country: 'Switzerland',
      isDefault: true,
    },
  ],
  notifications: {
    email: true,
    sms: false,
    promotions: true,
    newArrivals: true,
  },
};

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw);
        setProfile({ ...DEFAULT_PROFILE, ...stored });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const id = `addr-${Date.now()}`;
    setProfile((prev) => ({
      ...prev,
      addresses: [...prev.addresses, { ...addr, id }],
    }));
  };

  const updateAddress = (id: string, data: Partial<Address>) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => (a.id === id ? { ...a, ...data } : a)),
    }));
  };

  const removeAddress = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id),
    }));
  };

  const setDefaultAddress = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
    }));
  };

  const updateNotifications = (data: Partial<UserProfile['notifications']>) => {
    setProfile((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...data },
    }));
  };

  const value: ProfileContextValue = {
    profile,
    updateProfile,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
    updateNotifications,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
