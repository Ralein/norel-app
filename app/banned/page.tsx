"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Ban, Mail, LogOut } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export default function BannedPage() {
    const router = useRouter()

    const handleSignOut = async () => {
        await signOut(auth)
        router.push("/")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0e27] p-4">
            <Card className="max-w-md w-full bg-white border-0 shadow-2xl overflow-hidden">
                <div className="bg-red-600 h-2 w-full" />
                <CardHeader className="text-center pb-2">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Ban className="w-8 h-8 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Account Restricted</CardTitle>
                    <CardDescription className="text-gray-500">Your access to NOREL has been suspended</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center text-gray-600">
                        <p>We've detected activity that violates our terms of service or security policies. Your account is currently under review.</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
                        <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-medium text-gray-900">Need help?</p>
                            <p className="text-gray-500">If you believe this is a mistake, please contact our support team at <span className="font-semibold">support@norel.id</span></p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button
                            variant="outline"
                            className="w-full border-gray-200 text-gray-600 hover:bg-gray-50"
                            onClick={handleSignOut}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
