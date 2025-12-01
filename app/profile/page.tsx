"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User as UserIcon,
  Mail,
  Calendar,
  CheckCircle2,
  XCircle,
  LogOut,
  Edit,
  Save,
  X,
  Shield,
  Clock
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [stats, setStats] = useState({
    profiles: 0,
    shared: 0,
    documents: 0,
    forms: 0,
  });
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
      } else {
        router.push("/signin");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user) {
      const fetchStats = async () => {
        try {
          const [profilesRes, sharedRes, documentsRes, formsRes] = await Promise.all([
            fetch('/api/profiles'),
            fetch('/api/share-history'),
            fetch('/api/documents'),
            fetch('/api/forms')
          ]);

          const profiles = await profilesRes.json();
          const shared = await sharedRes.json();
          const documents = await documentsRes.json();
          const forms = await formsRes.json();

          setStats({
            profiles: profiles.length,
            shared: shared.length,
            documents: documents.length,
            forms: forms.length,
          });
        } catch (error) {
          

        }
      };

      fetchStats();
    }
  }, [user, toast]);

  const handleUpdateProfile = async () => {
    if (!user || !displayName.trim()) {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid display name.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await updateProfile(user, {
        displayName: displayName.trim(),
      });

      // Refresh user data
      await user.reload();
      setUser(auth.currentUser);
      setIsEditingName(false);

      toast({
        title: "Profile Updated",
        description: "Your display name has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully logged out.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Logout Failed",
        description: error.message || "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <UserIcon className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="text-muted-foreground">Manage your account information</p>
            </div>
          </div>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your personal details and account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Name Section */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                  <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                  <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                    {user.email?.[0].toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4 w-full">
                  {/* Display Name */}
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Display Name</Label>
                    {isEditingName ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Enter your name"
                          className="max-w-xs"
                          disabled={isSaving}
                        />
                        <Button
                          size="sm"
                          onClick={handleUpdateProfile}
                          disabled={isSaving || !displayName.trim()}
                        >
                          {isSaving ? (
                            <>Saving...</>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-1" />
                              Save
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setIsEditingName(false);
                            setDisplayName(user.displayName || "");
                          }}
                          disabled={isSaving}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold">
                          {user.displayName || "No name set"}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsEditingName(true)}
                          className="h-8"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Account Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{user.email}</p>
                    {user.emailVerified ? (
                      <Badge variant="default" className="bg-green-600">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <XCircle className="w-3 h-3 mr-1" />
                        Unverified
                      </Badge>
                    )}
                  </div>
                </div>

                {/* User ID */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    User ID
                  </Label>
                  <p className="font-mono text-sm bg-muted px-3 py-2 rounded-md break-all">
                    {user.uid}
                  </p>
                </div>

                {/* Account Created */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Account Created
                  </Label>
                  <p className="font-medium">{formatDate(user.metadata.creationTime)}</p>
                </div>

                {/* Last Sign In */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Last Sign In
                  </Label>
                  <p className="font-medium">{formatDate(user.metadata.lastSignInTime)}</p>
                </div>

                {/* Provider */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    Sign-In Method
                  </Label>
                  <div className="flex gap-2">
                    {user.providerData.map((provider, index) => (
                      <Badge key={index} variant="outline">
                        {provider.providerId === "password"
                          ? "Email/Password"
                          : provider.providerId === "google.com"
                          ? "Google"
                          : provider.providerId}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => router.push("/settings")}>
                  <UserIcon className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
         
        </div>
      </div>
    </div>
  );
}