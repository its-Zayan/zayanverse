import { Button } from "@/components/ui/button";

interface VerificationMessageProps {
  email: string;
  onSignIn: () => void;
}

export function VerificationMessage({ email, onSignIn }: VerificationMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center p-6 bg-gray-900/50 backdrop-blur-lg rounded-lg border border-gray-800">
      <h2 className="text-2xl font-bold text-white">Check Your Email</h2>
      <div className="text-gray-300">
        <p>We've sent a verification link to:</p>
        <p className="font-medium text-blue-400 mt-1">{email}</p>
      </div>
      <p className="text-sm text-gray-400 max-w-md">
        Please check your email and click the verification link to complete your registration. 
        Once verified, you can sign in to your account.
      </p>
      <Button 
        variant="outline" 
        onClick={onSignIn}
        className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
      >
        Go to Sign In
      </Button>
    </div>
  );
} 