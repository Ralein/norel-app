"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { adminLogin } from "../../actions/admin-auth"

export default function AdminLoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleSignIn = async (e?: React.FormEvent) => {
        e?.preventDefault()

        if (!email.trim() || !password.trim()) {
            toast({
                title: "Missing Information",
                description: "Please enter both email and password.",
                variant: "destructive",
            })
            return
        }

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("email", email.trim())
            formData.append("password", password)

            const result = await adminLogin(formData)

            if (result.success) {
                toast({
                    title: "Admin Access Granted",
                    description: "Welcome to the Admin Panel.",
                })
                router.push("/admin")
            } else {
                toast({
                    title: "Access Denied",
                    description: result.error || "Invalid credentials",
                    variant: "destructive",
                })
            }
        } catch (error: any) {
            toast({
                title: "Login Failed",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !loading) {
            handleSignIn()
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#0a0e27]">
            {/* Left Section - Hero (Same as main sign-in) */}
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
                            <h2 className="text-3xl font-bold text-white leading-tight">Admin Portal</h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Management interface for the Non-paper Relay Identity System
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Sign In Card */}
            <div className="flex items-center justify-center p-8 bg-white">
                <Card className="w-full max-w-md bg-[#0a0e27] text-white border-0 shadow-2xl">
                    <CardHeader className="space-y-2 pb-8">
                        <CardTitle className="text-4xl font-bold text-white">Admin Login</CardTitle>
                        <CardDescription className="text-base text-gray-400">Enter administrator credentials</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-200">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@example.com"
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
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter administrator password"
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
                            {loading ? "Authenticating..." : "Login to Admin Panel"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
