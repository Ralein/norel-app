"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Share2, Monitor, FileText, Plus, Clock, Shield } from "lucide-react"
import Link from "next/link"

interface ProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  primaryPhone: string;
  dateOfBirth: string;
  permanentAddress: string;
  permanentCity: string;
  permanentState: string;
  permanentZip: string;
  createdAt: string;
  lastUsed?: string;
}

interface ShareHistory {
  id: string;
  profileId: string;
  timestamp: string;
  formType: string;
  location: string;
}

export default function DashboardPage() {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [shareHistory, setShareHistory] = useState<ShareHistory[]>([]);

  useEffect(() => {
    const fetchProfilesAndShareHistory = async () => {
      try {
        const [profilesRes, shareHistoryRes] = await Promise.all([
          fetch('/api/profiles'),
          fetch('/api/share-history'),
        ]);

        if (!profilesRes.ok) {
          throw new Error('Failed to fetch profiles');
        }
        const profilesData = await profilesRes.json();
        setProfiles(profilesData);

        if (!shareHistoryRes.ok) {
          throw new Error('Failed to fetch share history');
        }
        const shareHistoryData = await shareHistoryRes.json();
        setShareHistory(shareHistoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProfilesAndShareHistory();
  }, []);

  const stats = {
    totalProfiles: profiles.length,
    totalShares: shareHistory.length,
    recentShares: shareHistory.filter((h) => new Date(h.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .length,
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">NOREL</h1>
              <p className="text-muted-foreground">Non-paper Relay Identity System</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Streamline your identity sharing with secure, tap-to-fill technology for banks, hospitals, and public
            services.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProfiles}</div>
              <p className="text-xs text-muted-foreground">Ready for sharing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalShares}</div>
              <p className="text-xs text-muted-foreground">All time usage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentShares}</div>
              <p className="text-xs text-muted-foreground">Past 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/profile/create">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Create Profile</CardTitle>
                <CardDescription>Set up a new identity profile for sharing</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/share">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Share2 className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle className="text-lg">Share Profile</CardTitle>
                <CardDescription>Generate QR code or NFC for instant sharing</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/kiosk">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Monitor className="w-6 h-6 text-green-500" />
                </div>
                <CardTitle className="text-lg">Kiosk Mode</CardTitle>
                <CardDescription>Receive and process shared profiles</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/documents">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-6 h-6 text-orange-500" />
                </div>
                <CardTitle className="text-lg">Documents</CardTitle>
                <CardDescription>Generate and manage PDF forms</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Recent Profiles */}
        {profiles.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Profiles</CardTitle>
              <CardDescription>Manage your identity profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profiles.slice(0, 3).map((profile) => (
                  <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{profile.firstName} {profile.lastName}</h3>
                        <p className="text-sm text-muted-foreground">{profile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{profile.lastUsed ? "Recently Used" : "Ready"}</Badge>
                      <Link href={`/profile/${profile.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              {profiles.length > 3 && (
                <div className="mt-4 text-center">
                  <Link href="/profiles">
                    <Button variant="outline">View All Profiles ({profiles.length})</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Getting Started */}
        {profiles.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Welcome to NOREL</CardTitle>
              <CardDescription>Get started by creating your first identity profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No profiles yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create your first identity profile to start using NOREL for seamless form filling at banks, hospitals,
                  and other institutions.
                </p>
                <Link href="/profile/create">
                  <Button size="lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
