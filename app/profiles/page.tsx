"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { User, Plus, Search, Edit, Trash2, Calendar, Mail, Phone } from "lucide-react"
import Link from "next/link"

interface ProfileData {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  createdAt: string
  lastUsed?: string
}

export default function ProfilesPage() {
  const { toast } = useToast()
  const [profiles, setProfiles] = useState<ProfileData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProfiles, setFilteredProfiles] = useState<ProfileData[]>([])

  useEffect(() => {
    // Load profiles from localStorage
    const savedProfiles = localStorage.getItem("norel-profiles")
    if (savedProfiles) {
      const parsedProfiles = JSON.parse(savedProfiles)
      setProfiles(parsedProfiles)
      setFilteredProfiles(parsedProfiles)
    }
  }, [])

  useEffect(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    const filtered = profiles.filter((profile) => {
      const name = (profile.name ?? "").toLowerCase()
      const email = (profile.email ?? "").toLowerCase()
      const phone = profile.phone ?? ""

      return name.includes(normalizedSearch) || email.includes(normalizedSearch) || phone.includes(searchTerm)
    })

    setFilteredProfiles(filtered)
  }, [profiles, searchTerm])

  const deleteProfile = (profileId: string) => {
    const updatedProfiles = profiles.filter((p) => p.id !== profileId)
    setProfiles(updatedProfiles)
    localStorage.setItem("norel-profiles", JSON.stringify(updatedProfiles))

    toast({
      title: "Profile Deleted",
      description: "The profile has been removed successfully.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Profiles</h1>
            <p className="text-muted-foreground">Manage your identity profiles</p>
          </div>
          <Link href="/profile/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Profile
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search profiles by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Profiles Grid */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{profile.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {profile.email}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      {profile.phone}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      Born {formatDate(profile.dateOfBirth)}
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="text-muted-foreground">
                      {profile.address}, {profile.city}, {profile.state} {profile.zipCode}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant={profile.lastUsed ? "default" : "secondary"}>
                      {profile.lastUsed ? "Recently Used" : "Ready"}
                    </Badge>
                    <div className="text-xs text-muted-foreground">Created {formatDate(profile.createdAt)}</div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/profile/${profile.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteProfile(profile.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              {profiles.length === 0 ? (
                <>
                  <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Profiles Yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Create your first identity profile to start using NOREL for seamless form filling.
                  </p>
                  <Link href="/profile/create">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Results Found</h3>
                  <p className="text-muted-foreground mb-6">
                    No profiles match your search criteria. Try a different search term.
                  </p>
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Clear Search
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
