"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      toast({
        title: "Welcome Back",
        description: "You have successfully signed in!",
      });
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessages: Record<string, { title: string; description: string }> = {
        "auth/user-not-found": {
          title: "Invalid Credentials",
          description: "Email or password is incorrect. Please try again.",
        },
        "auth/wrong-password": {
          title: "Invalid Credentials",
          description: "Email or password is incorrect. Please try again.",
        },
        "auth/invalid-credential": {
          title: "Invalid Credentials",
          description: "Email or password is incorrect. Please try again.",
        },
        "auth/invalid-email": {
          title: "Invalid Email",
          description: "Please enter a valid email address.",
        },
        "auth/too-many-requests": {
          title: "Too Many Attempts",
          description: "Account temporarily locked. Please try again later or reset your password.",
        },
        "auth/user-disabled": {
          title: "Account Disabled",
          description: "This account has been disabled. Please contact support.",
        },
      };

      const errorMsg = errorMessages[error.code] || {
        title: "Sign In Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
      };

      toast({
        title: errorMsg.title,
        description: errorMsg.description,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
      toast({
        title: "Welcome",
        description: "Successfully signed in with Google!",
      });
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessages: Record<string, { title: string; description: string }> = {
        "auth/popup-closed-by-user": {
          title: "Sign In Cancelled",
          description: "Google sign-in was cancelled.",
        },
        "auth/popup-blocked": {
          title: "Popup Blocked",
          description: "Please allow popups for this site to sign in with Google.",
        },
      };

      const errorMsg = errorMessages[error.code] || {
        title: "Google Sign-In Failed",
        description: error.message || "Could not sign in with Google.",
      };

      toast({
        title: errorMsg.title,
        description: errorMsg.description,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSignIn();
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#0a0e27]">
      {/* Left Section - Hero */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 border-r border-white/10">
        <div className="max-w-md space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white">NOREL</h1>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white leading-tight">Non-paper Relay Identity System</h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                Secure, seamless identity verification for the modern world
              </p>
            </div>
          </div>

          <div className="space-y-5 pt-4">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-all duration-300">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-white">End-to-end Encryption</h3>
                <p className="text-sm text-gray-400">Your data is protected with military-grade security</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-all duration-300">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-white">Instant Verification</h3>
                <p className="text-sm text-gray-400">Share your identity with a simple tap or scan</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-all duration-300">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-white">Always Available</h3>
                <p className="text-sm text-gray-400">Access your profiles anytime, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Sign In Card */}
      <div className="flex items-center justify-center p-8 bg-white">
        <Card className="w-full max-w-md bg-[#0a0e27] text-white border-0 shadow-2xl">
          <CardHeader className="space-y-2 pb-8">
            <CardTitle className="text-4xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-base text-gray-400">Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-200">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="h-12 pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                  autoComplete="email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-200">Password</Label>
                <Link href="/forgot-password" className="text-xs text-gray-400 hover:text-white hover:underline transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="h-12 pl-10 pr-11 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              className="w-full h-12 bg-white text-[#0a0e27] hover:bg-gray-100 font-semibold shadow-lg transition-all duration-300"
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0a0e27] px-3 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>

            <p className="text-center text-sm text-gray-400 pt-2">
              New to NOREL?{" "}
              <Link href="/signup" className="text-white hover:underline font-semibold transition-colors">
                Create Account
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}