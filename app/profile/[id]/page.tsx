"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
}

export default function EditProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<ProfileData>>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profiles/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await res.json();
        setProfile(data);
        setFormData(data);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to load profile. Please try again.",
          variant: "destructive",
        });
        router.push('/profiles'); // Redirect if profile not found or error
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id, router, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      router.push('/profiles');
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return null; // Should redirect by router.push if profile not found
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="primaryPhone">Primary Phone</Label>
                <Input
                  id="primaryPhone"
                  name="primaryPhone"
                  value={formData.primaryPhone || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  name="middleName"
                  value={(formData as any).middleName || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="nameAsPerID">Name as per ID</Label>
                <Input
                  id="nameAsPerID"
                  name="nameAsPerID"
                  value={(formData as any).nameAsPerID || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  name="gender"
                  value={(formData as any).gender || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  name="nationality"
                  value={(formData as any).nationality || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="permanentAddress">Permanent Address</Label>
                <Input
                  id="permanentAddress"
                  name="permanentAddress"
                  value={formData.permanentAddress || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="permanentCity">Permanent City</Label>
                <Input
                  id="permanentCity"
                  name="permanentCity"
                  value={formData.permanentCity || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="permanentState">Permanent State</Label>
                <Input
                  id="permanentState"
                  name="permanentState"
                  value={formData.permanentState || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="permanentZip">Permanent ZIP</Label>
                <Input
                  id="permanentZip"
                  name="permanentZip"
                  value={formData.permanentZip || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="currentAddress">Current Address</Label>
                <Input
                  id="currentAddress"
                  name="currentAddress"
                  value={(formData as any).currentAddress || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="currentCity">Current City</Label>
                <Input
                  id="currentCity"
                  name="currentCity"
                  value={(formData as any).currentCity || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="currentState">Current State</Label>
                <Input
                  id="currentState"
                  name="currentState"
                  value={(formData as any).currentState || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="currentZip">Current ZIP</Label>
                <Input
                  id="currentZip"
                  name="currentZip"
                  value={(formData as any).currentZip || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  id="panNumber"
                  name="panNumber"
                  value={(formData as any).panNumber || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                <Input
                  id="aadhaarNumber"
                  name="aadhaarNumber"
                  value={(formData as any).aadhaarNumber || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  name="bankName"
                  value={(formData as any).bankName || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  value={(formData as any).accountNumber || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="ifscCode">IFSC Code</Label>
                <Input
                  id="ifscCode"
                  name="ifscCode"
                  value={(formData as any).ifscCode || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={(formData as any).occupation || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="employerName">Employer Name</Label>
                <Input
                  id="employerName"
                  name="employerName"
                  value={(formData as any).employerName || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-4"></div>
                <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                <Input
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={(formData as any).emergencyContactName || ''}
                  onChange={handleChange}
                />
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
