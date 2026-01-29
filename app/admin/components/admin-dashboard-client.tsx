"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Share2, Clock, Shield, Ban, CheckCircle, Search, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { toggleUserBan } from "../../actions/admin-actions"
import { adminLogout } from "../../actions/admin-auth"
import { useRouter } from "next/navigation"

interface UserProfile {
    id: string
    firstName: string
    lastName: string
    email: string
    isBanned: boolean
    createdAt: any
}

export function AdminDashboardClient({ initialUsers }: { initialUsers: UserProfile[] }) {
    const [users, setUsers] = useState<UserProfile[]>(initialUsers)
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState<string | null>(null)
    const { toast } = useToast()
    const router = useRouter()

    const handleToggleBan = async (userId: string, currentBanStatus: boolean) => {
        setLoading(userId)
        try {
            const result = await toggleUserBan(userId, !currentBanStatus)
            if (result.success) {
                setUsers(users.map(u => u.id === userId ? { ...u, isBanned: !currentBanStatus } : u))
                toast({
                    title: !currentBanStatus ? "User Banned" : "User Unbanned",
                    description: `User has been ${!currentBanStatus ? "banned" : "unbanned"} successfully.`,
                })
            } else {
                toast({
                    title: "Error",
                    description: result.error || "Failed to update user status",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred",
                variant: "destructive",
            })
        } finally {
            setLoading(null)
        }
    }

    const handleLogout = async () => {
        await adminLogout()
        router.push("/admin/login")
    }

    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const stats = {
        totalUsers: users.length,
        bannedUsers: users.filter(u => u.isBanned).length,
        activeUsers: users.filter(u => !u.isBanned).length,
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <Shield className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Admin Panel</h1>
                            <p className="text-muted-foreground">Manage users and system settings</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="w-fit">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalUsers}</div>
                            <p className="text-xs text-muted-foreground">Registered profiles</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.activeUsers}</div>
                            <p className="text-xs text-muted-foreground">Access allowed</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Banned Users</CardTitle>
                            <Ban className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.bannedUsers}</div>
                            <p className="text-xs text-muted-foreground">Access denied</p>
                        </CardContent>
                    </Card>
                </div>

                {/* User Management Section */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <CardTitle>User Management</CardTitle>
                                <CardDescription>View and manage application users</CardDescription>
                            </div>
                            <div className="relative w-full md:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name or email..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg transition-colors hover:bg-muted/50">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 ${user.isBanned ? 'bg-red-500/10' : 'bg-primary/10'} rounded-full flex items-center justify-center`}>
                                                <User className={`w-5 h-5 ${user.isBanned ? 'text-red-500' : 'text-primary'}`} />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant={user.isBanned ? "destructive" : "secondary"}>
                                                {user.isBanned ? "Banned" : "Active"}
                                            </Badge>
                                            <Button
                                                variant={user.isBanned ? "outline" : "destructive"}
                                                size="sm"
                                                disabled={loading === user.id}
                                                onClick={() => handleToggleBan(user.id, user.isBanned)}
                                            >
                                                {loading === user.id ? "Processing..." : user.isBanned ? "Unban" : "Ban"}
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No users found matching your search.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
