"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { QRCodeSVG } from "qrcode.react"
import { Share2, Smartphone, QrCode, Copy, Check, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
// Web NFC is available on some browsers as a global `NDEFReader`
// This prevents TypeScript errors without importing a non-existent package.
declare global {
  interface Window {
    NDEFReader?: {
      new (): {
        write: (data: unknown) => Promise<void>
      }
    }
  }
}

interface ProfileData {
  id: string
  firstName: string
  middleName: string
  lastName: string
  nameAsPerID: string
  email: string
  primaryPhone: string
  alternatePhone: string
  dateOfBirth: string
  age: string
  gender: string
  bloodGroup: string
  nationality: string
  permanentAddress: string
  permanentCity: string
  permanentState: string
  permanentZip: string
  currentAddress: string
  currentCity: string
  currentState: string
  currentZip: string
  occupation: string
  employerName: string
  employmentType: string
  emergencyContactName: string
  emergencyContactNumber: string
  formCategory: string
  preferredLanguage: string
  createdAt: string
}

export default function SharePage() {
  const { toast } = useToast()
  const [profiles, setProfiles] = useState<ProfileData[]>([])
  const [selectedProfile, setSelectedProfile] = useState<string>("")
  const [shareUrl, setShareUrl] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [nfcSupported, setNfcSupported] = useState(false)

  useEffect(() => {
    // Load profiles from localStorage
    const savedProfiles = localStorage.getItem("norel-profiles")
    if (savedProfiles) {
      const parsedProfiles = JSON.parse(savedProfiles)
      setProfiles(parsedProfiles)
      if (parsedProfiles.length > 0) {
        setSelectedProfile(parsedProfiles[0].id)
      }
    }

    // Check NFC support
    if ("NDEFReader" in window) {
      setNfcSupported(true)
    }
  }, [])

  useEffect(() => {
    if (selectedProfile) {
      const profile = profiles.find((p) => p.id === selectedProfile)
      if (profile) {
        // Create a secure share URL with encrypted profile data
        const shareData = {
          id: profile.id,
          // Personal Information
          firstName: profile.firstName,
          middleName: profile.middleName,
          lastName: profile.lastName,
          nameAsPerID: profile.nameAsPerID,
          email: profile.email,
          primaryPhone: profile.primaryPhone,
          alternatePhone: profile.alternatePhone,
          dateOfBirth: profile.dateOfBirth,
          age: profile.age,
          gender: profile.gender,
          bloodGroup: profile.bloodGroup,
          nationality: profile.nationality,

          // Address Information
          permanentAddress: profile.permanentAddress,
          permanentCity: profile.permanentCity,
          permanentState: profile.permanentState,
          permanentZip: profile.permanentZip,
          currentAddress: profile.currentAddress,
          currentCity: profile.currentCity,
          currentState: profile.currentState,
          currentZip: profile.currentZip,

          // Professional Information
          occupation: profile.occupation,
          employerName: profile.employerName,
          employmentType: profile.employmentType,

          // Emergency Contact
          emergencyContactName: profile.emergencyContactName,
          emergencyContactNumber: profile.emergencyContactNumber,

          // Additional
          formCategory: profile.formCategory,
          preferredLanguage: profile.preferredLanguage,

          // Security
          timestamp: Date.now(),
          expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        }

        const encodedData = btoa(JSON.stringify(shareData))
        const url = `${window.location.origin}/kiosk?data=${encodedData}`
        setShareUrl(url)
      }
    }
  }, [selectedProfile, profiles])

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Share URL copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      })
    }
  }

  const handleNFCShare = async () => {
    if (!nfcSupported) {
      toast({
        title: "NFC Not Supported",
        description: "Your device does not support NFC",
        variant: "destructive",
      })
      return
    }

    try {
      const ndef = new window.NDEFReader!()
      await ndef.write({
        records: [{ recordType: "url", data: shareUrl }],
      })

      toast({
        title: "NFC Ready",
        description: "Profile data written to NFC. Tap your device to share.",
      })
    } catch (error) {
      toast({
        title: "NFC Error",
        description: "Failed to write NFC data",
        variant: "destructive",
      })
    }
  }

  const generateNewUrl = () => {
    if (selectedProfile) {
      const profile = profiles.find((p) => p.id === selectedProfile)
      if (profile) {
        const shareData = {
          ...profile,
          timestamp: Date.now(),
        }
        const encodedData = btoa(JSON.stringify(shareData))
        const url = `${window.location.origin}/kiosk?data=${encodedData}`
        setShareUrl(url)

        toast({
          title: "New URL Generated",
          description: "A fresh share URL has been created",
        })
      }
    }
  }

  const selectedProfileData = profiles.find((p) => p.id === selectedProfile)

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Share Profile</h1>
            <Card>
              <CardContent className="py-12">
                <Share2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Profiles Available</h3>
                <p className="text-muted-foreground mb-6">You need to create a profile before you can share it.</p>
                <Button asChild>
                  <a href="/profile/create">Create Profile</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Share Profile</h1>
            <p className="text-muted-foreground">
              Generate QR code or NFC data to instantly share your profile at kiosks
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Selection */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Profile</CardTitle>
                  <CardDescription>Choose which profile to share</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedProfile} onValueChange={setSelectedProfile}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a profile" />
                    </SelectTrigger>
                    <SelectContent>
                      {profiles.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.firstName} {profile.lastName} - {profile.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Profile Preview */}
              {selectedProfileData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Preview</CardTitle>
                    <CardDescription>Data that will be shared</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium">Full Name:</span>
                          <p className="text-muted-foreground">
                            {selectedProfileData.firstName} {selectedProfileData.middleName}{" "}
                            {selectedProfileData.lastName}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Email:</span>
                          <p className="text-muted-foreground">{selectedProfileData.email}</p>
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span>
                          <p className="text-muted-foreground">{selectedProfileData.primaryPhone}</p>
                        </div>
                        <div>
                          <span className="font-medium">Date of Birth:</span>
                          <p className="text-muted-foreground">
                            {selectedProfileData.dateOfBirth} (Age: {selectedProfileData.age})
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="font-medium">Permanent Address:</span>
                        <p className="text-muted-foreground">
                          {selectedProfileData.permanentAddress}, {selectedProfileData.permanentCity},{" "}
                          {selectedProfileData.permanentState} {selectedProfileData.permanentZip}
                        </p>
                      </div>

                      {selectedProfileData.occupation && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium">Occupation:</span>
                            <p className="text-muted-foreground">{selectedProfileData.occupation}</p>
                          </div>
                          <div>
                            <span className="font-medium">Employer:</span>
                            <p className="text-muted-foreground">{selectedProfileData.employerName}</p>
                          </div>
                        </div>
                      )}

                      {selectedProfileData.emergencyContactName && (
                        <div>
                          <span className="font-medium">Emergency Contact:</span>
                          <p className="text-muted-foreground">
                            {selectedProfileData.emergencyContactName} - {selectedProfileData.emergencyContactNumber}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex flex-wrap gap-2">
                        {selectedProfileData.bloodGroup && (
                          <Badge variant="outline">Blood: {selectedProfileData.bloodGroup}</Badge>
                        )}
                        {selectedProfileData.nationality && (
                          <Badge variant="outline">{selectedProfileData.nationality}</Badge>
                        )}
                        {selectedProfileData.formCategory && (
                          <Badge variant="secondary">{selectedProfileData.formCategory}</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Share Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Share Options</CardTitle>
                  <CardDescription>Choose how to share your profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={handleCopyUrl} className="w-full justify-start bg-transparent" variant="outline">
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy Share URL"}
                  </Button>

                  <Button
                    onClick={handleNFCShare}
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    disabled={!nfcSupported}
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    {nfcSupported ? "Write to NFC" : "NFC Not Supported"}
                  </Button>

                  <Button onClick={generateNewUrl} className="w-full justify-start bg-transparent" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate New URL
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* QR Code */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
                    QR Code
                  </CardTitle>
                  <CardDescription>Scan this code at any NOREL-enabled kiosk</CardDescription>
                </CardHeader>
                <CardContent>
                  {shareUrl ? (
                    <div className="text-center space-y-4">
                      <div className="bg-white p-6 rounded-lg inline-block">
                        <QRCodeSVG value={shareUrl} size={200} level="M" includeMargin={true} />
                      </div>
                      <div className="space-y-2">
                        <Badge variant="secondary">Expires in 24 hours</Badge>
                        <p className="text-xs text-muted-foreground">This QR code contains encrypted profile data</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">Select a profile to generate QR code</div>
                  )}
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">1</span>
                    </div>
                    <p>Select the profile you want to share from the dropdown above</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">2</span>
                    </div>
                    <p>Show the QR code to the kiosk scanner or tap your NFC-enabled device</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">3</span>
                    </div>
                    <p>Your information will be automatically filled into the form</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
