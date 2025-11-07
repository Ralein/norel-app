"use client"
import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // In a real app, you would send email/password to your backend for authentication
    console.log("Attempting login with:", { email, password })
    // Simulate successful login and redirect
    router.push("/dashboard")
    setLoading(false)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Section - Hero */}
        <div className="flex flex-col gap-6 text-center lg:text-left px-4">
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="p-3 bg-gradient-to-br from-blue-900/90 to-blue-600/90 rounded-2xl shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900/90 to-blue-600/80 bg-clip-text text-transparent">
                NOREL
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Non-paper Relay Identity System
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              The future of identity sharing is here
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Securely log in to your NOREL account and experience seamless, paperless identity verification.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Always Available</span>
            </div>
          </div>
        </div>

        {/* Right Section - Login Card */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md backdrop-blur-xl bg-white/70 border-white/20 shadow-2xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full h-11 bg-white/50 backdrop-blur-sm border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-11 bg-white/50 backdrop-blur-sm border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/70 text-gray-500">
                    New to NOREL?
                  </span>
                </div>
              </div>

              <Link href="/profile/create">
                <Button 
                  variant="outline" 
                  className="w-full h-11 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 font-medium transition-all duration-200"
                >
                  Create Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}