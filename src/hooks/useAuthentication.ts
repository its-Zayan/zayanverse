import { useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  AuthError
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const useAuthentication = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
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
      setError(handleAuthError(error));
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        setError('Please verify your email before signing in. Check your inbox for the verification link.');
        throw new Error('Email not verified');
      }

      Cookies.set('auth', 'true', { expires: 7 });
      router.push('/');
    } catch (error: any) {
      console.error('Error signing in:', error);
      setError(error.message === 'Email not verified' ? 'Please verify your email before signing in. Check your inbox for the verification link.' : handleAuthError(error));
      throw error;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      Cookies.remove('auth');
      router.push('/auth');
    } catch (error: any) {
      console.error('Error logging out:', error);
      setError('Error logging out. Please try again.');
      throw error;
    }
  };

  return {
    error,
    signUp,
    signIn,
    logout,
  };
}; 