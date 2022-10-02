import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

interface IAuth {
    user: UserType | null;
    setUser: (user: UserType) => void;
    login: (email: string, password: string) => Promise<any>;
    register: (email: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
}

export type UserType = {
    displayName: string | null,
    email: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    phoneNumber: string | null,
    photoURL: string | null,
};

export const AuthContext = createContext<IAuth>({} as IAuth);

export const AuthProvider = ({ children }: { children: React.ReactNode; }): JSX.Element => {
    const [user, setUser] = useState<UserType | null>(null);

    async function login(email: string, password: string): Promise<any> {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (err) {
            console.log('Login error:', err);
        }
    }

    async function register(email: string, password: string) {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
        } catch (err) {
            console.log('Register error:', err);
        }
    }

    async function logout() {
        try {
            await auth().signOut();
        } catch (err) {
            console.log('Logout error:', err);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );

};