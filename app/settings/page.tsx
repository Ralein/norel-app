"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Settings, Shield, Bell, Download, Trash2, Save, User, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

interface AppSettings {
  notifications: boolean
  autoFill: boolean
  dataRetention: number
  encryptionEnabled: boolean
  shareExpiry: number
  backupEnabled: boolean
}

export default function SettingsPage() {
  const { toast } = useToast()
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [settings, setSettings] = useState<AppSettings>({
    notifications: true,
    autoFill: true,
    dataRetention: 30,
    encryptionEnabled: true,
    shareExpiry: 24,
    backupEnabled: false,
  })

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("norel-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const saveSettings = () => {
    localStorage.setItem("norel-settings", JSON.stringify(settings))
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const exportData = () => {
    const profiles = localStorage.getItem("norel-profiles") || "[]"
    const documents = localStorage.getItem("norel-documents") || "[]"
    const shareHistory = localStorage.getItem("norel-share-history") || "[]"

    const exportData = {
      profiles: JSON.parse(profiles),
      documents: JSON.parse(documents),
      shareHistory: JSON.parse(shareHistory),
      settings: settings,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `norel-backup-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Data Exported",
      description: "Your NOREL data has been downloaded as a backup file.",
    })
  }

  const clearAllData = () => {
    if (confirm("Are you sure you want to delete all data? This action cannot be undone.")) {
      localStorage.removeItem("norel-profiles")
      localStorage.removeItem("norel-documents")
      localStorage.removeItem("norel-share-history")
      localStorage.removeItem("norel-settings")

      toast({
        title: "Data Cleared",
        description: "All NOREL data has been permanently deleted.",
      })

      // Reset settings to defaults
      setSettings({
        notifications: true,
        autoFill: true,
        dataRetention: 30,
        encryptionEnabled: true,
        shareExpiry: 24,
        backupEnabled: false,
      })
    }
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your NOREL preferences and data</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Account Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account
                </CardTitle>
                <CardDescription>Manage your NOREL account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {authLoading ? (
                  <p>Loading account details...</p>
                ) : user ? (
                  <>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <div className="flex space-x-2">
                      <Button asChild variant="outline">
                        <Link href="/profile">
                          <User className="w-4 h-4 mr-2" />
                          View Profile
                        </Link>
                      </Button>
                      <Button onClick={handleLogout} variant="outline">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>Not logged in.</p>
                )}
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Control how your data is handled and shared</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">Encrypt profile data before sharing</p>
                  </div>
                  <Switch
                    checked={settings.encryptionEnabled}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, encryptionEnabled: checked }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Share Link Expiry (hours)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="168"
                    value={settings.shareExpiry}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, shareExpiry: Number.parseInt(e.target.value) || 24 }))
                    }
                    className="w-32"
                  />
                  <p className="text-sm text-muted-foreground">How long share links remain valid (1-168 hours)</p>
                </div>

                <div className="space-y-2">
                  <Label>Data Retention (days)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="365"
                    value={settings.dataRetention}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, dataRetention: Number.parseInt(e.target.value) || 30 }))
                    }
                    className="w-32"
                  />
                  <p className="text-sm text-muted-foreground">
                    Automatically delete old share history after this many days
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  User Experience
                </CardTitle>
                <CardDescription>Customize how NOREL works for you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show success and error notifications</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, notifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-fill Forms</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically fill forms when profile data is received
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoFill}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoFill: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">Automatically backup data to browser storage</p>
                  </div>
                  <Switch
                    checked={settings.backupEnabled}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, backupEnabled: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Export or delete your NOREL data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={exportData} variant="outline" className="flex-1 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export All Data
                  </Button>

                  <Button onClick={clearAllData} variant="destructive" className="flex-1">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete All Data
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Export creates a backup file with all your profiles, documents, and settings. Delete permanently
                  removes all NOREL data from this device.
                </p>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About NOREL</CardTitle>
                <CardDescription>System information and version details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Version:</span>
                    <p className="text-muted-foreground">1.0.0</p>
                  </div>
                  <div>
                    <span className="font-medium">Build:</span>
                    <p className="text-muted-foreground">2024.01.15</p>
                  </div>
                  <div>
                    <span className="font-medium">Storage:</span>
                    <p className="text-muted-foreground">Local Browser Storage</p>
                  </div>
                  <div>
                    <span className="font-medium">Encryption:</span>
                    <p className="text-muted-foreground">AES-256 (Simulated)</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    NOREL (Non-paper Relay) is a secure identity-sharing system designed for modern institutions. Your
                    data is stored locally and encrypted for privacy.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={saveSettings} size="lg">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
