import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import type { User } from 'firebase/auth';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  AuthErrorCodes,
  FirebaseError
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthError extends FirebaseError {
  code: string;
  message: string;
}

export function useAuthentication() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthState((prev) => ({
        ...prev,
        user,
        loading: false,
      }));
    });

    return () => unsubscribe();
  }, []);

  const handleAuthError = (error: AuthError) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please sign in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 8 characters long.';
      case 'auth/user-not-found':
        return 'No account found with this email. Please sign up first.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    try {
      setAuthState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setAuthState((prev) => ({
        ...prev,
        user: userCredential.user,
        loading: false,
      }));

      const userData = {
        email: email,
        createdAt: new Date().toISOString(),
        purchases: [],
        verified: false
      };

      await Promise.all([
        sendEmailVerification(userCredential.user),
        setDoc(doc(db, 'users', userCredential.user.uid), userData)
      ]);

      // Sign out after signup to force email verification
      await signOut(auth);
      return true;
    } catch (error: any) {
      console.error('Error signing up:', error);
      setAuthState((prev) => ({
        ...prev,
        error: handleAuthError(error as AuthError),
        loading: false,
      }));
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setAuthState((prev) => ({
        ...prev,
        user: userCredential.user,
        loading: false,
      }));

      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        setAuthState((prev) => ({
          ...prev,
          error: 'Please verify your email before signing in. Check your inbox for the verification link.',
          loading: false,
        }));
        throw new Error('Email not verified');
      }

      Cookies.set('auth', 'true', { expires: 7 });
      router.push('/');
    } catch (error: any) {
      console.error('Error signing in:', error);
      setAuthState((prev) => ({
        ...prev,
        error: error.message === 'Email not verified' ? 'Please verify your email before signing in. Check your inbox for the verification link.' : handleAuthError(error as AuthError),
        loading: false,
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      setAuthState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      await signOut(auth);
      Cookies.remove('auth');
      router.push('/auth');
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('Error logging out:', error);
      setAuthState((prev) => ({
        ...prev,
        error: 'Error logging out. Please try again.',
        loading: false,
      }));
      throw error;
    }
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    signUp,
    signIn,
    logout,
  };
} 