import React, { createContext, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface IAuth {
    user: FirebaseAuthTypes.User | null;
    setUser: (user: FirebaseAuthTypes.User) => void;
    login: (email: string, password: string) => Promise<any>;
    register: (email: string, password: string, userName: string) => Promise<any>;
    logout: () => Promise<any>;
}

export const AuthContext = createContext<IAuth>({} as IAuth);

export const AuthProvider = ({ children }: { children: React.ReactNode; }): JSX.Element => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    async function login(email: string, password: string): Promise<any> {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (err) {
            console.log('Login error:', err);
        }
    }

    async function register(email: string, password: string, userName: string = '') {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            await auth().currentUser!.updateProfile({
                displayName: userName
            });
            const updatedUser = await auth().currentUser;
            setUser(updatedUser);
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