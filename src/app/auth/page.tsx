"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import LoginCharacter from "@/components/LoginCharacter";
import { initializeLoginAnimations } from "@/lib/loginAnimations";
import "@/styles/login.css";

interface PasswordRequirements {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

function RequirementIndicator({ met }: { met: boolean }) {
  return (
    <motion.div 
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`w-4 h-4 rounded-full flex items-center justify-center ${met ? 'bg-green-500' : 'dark:bg-gray-700 bg-gray-200'}`}
    >
      {met && <Check className="w-3 h-3 text-white" />}
    </motion.div>
  );
}

function VerificationMessage({ email, onSignIn }: { email: string; onSignIn: () => void }) {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-md w-full space-y-6 p-8 bg-gray-900/50 backdrop-blur-lg rounded-lg border border-gray-800"
    >
      <h2 className="text-2xl font-bold text-white text-center">Check Your Email</h2>
      <div className="text-gray-300 text-center">
        <p>We've sent a verification link to:</p>
        <p className="font-medium text-blue-400 mt-1">{email}</p>
      </div>
      <p className="text-sm text-gray-400 text-center">
        Please check your email and click the verification link to complete your registration.
      </p>
      <Button 
        variant="outline" 
        onClick={onSignIn}
        className="w-full mt-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
      >
        Back to Sign In
      </Button>
    </motion.div>
  );
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const { signIn, signUp, error } = useAuth();
  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirements>({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Load GSAP and initialize animations
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    script.async = true;
    script.onload = () => {
      if (typeof window !== 'undefined') {
        initializeLoginAnimations();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin) {
      const allRequirementsMet = Object.values(passwordRequirements).every(req => req);
      if (!allRequirementsMet) return;

      try {
        await signUp(email, password);
        setShowVerification(true);
      } catch {
        // Error is handled by auth context
      }
    } else {
      try {
        await signIn(email, password);
      } catch {
        // Error is handled by auth context
      }
    }
  };

  const updatePasswordRequirements = (password: string) => {
    setPasswordRequirements({
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleEmailFocus = () => {
    const emailGroup = document.querySelector('.inputGroup1');
    emailGroup?.classList.add('focusWithText');
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const emailGroup = document.querySelector('.inputGroup1');
    if (e.target.value === '') {
      emailGroup?.classList.remove('focusWithText');
    }
  };

  if (showVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-black to-black relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-[1px] z-0" />
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
        <VerificationMessage 
          email={email} 
          onSignIn={() => {
            setShowVerification(false);
            setIsLogin(true);
            setPassword("");
          }} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-black to-black relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-[1px] z-0" />
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full space-y-6 p-8 bg-gray-900/50 backdrop-blur-lg rounded-lg border border-gray-800 relative z-10"
      >
        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-6">
          <LoginCharacter />

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-red-500/10 border border-red-500/50"
            >
              <p className="text-red-400 text-sm text-center font-medium">{error}</p>
            </motion.div>
          )}

          <div className="inputGroup inputGroup1">
            <label htmlFor="loginEmail" className="text-gray-300">Email</label>
            <Input
              id="loginEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              required
              placeholder="email@domain.com"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all h-12 text-base px-4 w-full font-normal"
            />
          </div>

          <div className="inputGroup inputGroup2 relative">
            <label htmlFor="loginPassword" className="text-gray-300">Password</label>
            <div className="relative flex items-center">
              <Input
                id="loginPassword"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!isLogin) {
                    updatePasswordRequirements(e.target.value);
                  }
                }}
                required
                minLength={8}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all h-12 text-base px-4 w-full pr-14 font-normal tracking-wide"
                style={{ letterSpacing: '0.5px' }}
              />
              <input 
                id="showPasswordCheck" 
                type="checkbox" 
                className="hidden" 
                checked={showPassword}
                onChange={(e) => {
                  setShowPassword(e.target.checked);
                  const passwordInput = document.getElementById('loginPassword') as HTMLInputElement;
                  if (passwordInput) {
                    passwordInput.type = e.target.checked ? 'text' : 'password';
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 h-8 flex items-center justify-center">
                <button 
                  type="button"
                  id="showPasswordToggle" 
                  onClick={(e) => {
                    e.preventDefault();
                    const checkbox = document.querySelector('#showPasswordCheck') as HTMLInputElement;
                    if (checkbox) {
                      checkbox.checked = !checkbox.checked;
                      setShowPassword(checkbox.checked);
                      const passwordInput = document.getElementById('loginPassword') as HTMLInputElement;
                      if (passwordInput) {
                        passwordInput.type = checkbox.checked ? 'text' : 'password';
                      }
                      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                  }}
                  className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer rounded-md hover:bg-gray-700/50 active:bg-gray-600/50"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 stroke-[1.5]" /> : <Eye className="w-5 h-5 stroke-[1.5]" />}
                </button>
              </div>
            </div>
          </div>

          {!isLogin && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <p className="text-sm font-medium text-gray-300">Password must have:</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RequirementIndicator met={passwordRequirements.minLength} />
                  <span className="text-sm text-gray-400">At least 8 characters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RequirementIndicator met={passwordRequirements.hasUpperCase} />
                  <span className="text-sm text-gray-400">One uppercase letter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RequirementIndicator met={passwordRequirements.hasLowerCase} />
                  <span className="text-sm text-gray-400">One lowercase letter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RequirementIndicator met={passwordRequirements.hasNumber} />
                  <span className="text-sm text-gray-400">One number</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RequirementIndicator met={passwordRequirements.hasSpecialChar} />
                  <span className="text-sm text-gray-400">One special character</span>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] h-16 text-lg"
              disabled={!isLogin && !Object.values(passwordRequirements).every(req => req)}
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setPassword("");
                updatePasswordRequirements("");
              }}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
} 