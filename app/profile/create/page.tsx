"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, User } from "lucide-react"
import Link from "next/link"

interface ProfileFormData {
  // Personal Information
  firstName: string;
  middleName: string;
  lastName: string;
  nameAsPerID: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  placeOfBirth: string;
  bloodGroup: string;

  // Contact & Address
  permanentAddress: string;
  permanentCity: string;
  permanentState: string;
  permanentZip: string;
  currentAddress: string;
  currentCity: string;
  currentState: string;
  currentZip: string;
  primaryPhone: string;
  alternatePhone: string;
  email: string;
  communicationPreference: string;

  // Identity Documents
  panNumber: string;
  aadhaarNumber: string;
  voterIdNumber: string;
  passportNumber: string;
  governmentIdFile: string;
  photoFile: string;
  signatureFile: string;

  // Banking & Financial
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  creditCardNumber: string;
  cvv: string;
  monthlyIncome: string;
  annualIncome: string;
  incomeTaxPaid: string;
  occupation: string;
  employerName: string;
  employmentType: string;

  // Family & Nominee
  fatherName: string;
  motherName: string;
  spouseName: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  nomineeName: string;
  nomineeRelationship: string;
  nomineeDOB: string;

  // Health & Insurance
  healthInsuranceProvider: string;
  healthPolicyNumber: string;
  medicalHistory: string;
  allergies: string;
  ongoingMedications: string;
  dataConsent: boolean;

  // Additional Fields
  educationalQualification: string;
  formCategory: string;
  preferredLanguage: string;
  additionalNotes: string;
}

interface FileData {
  governmentIdFile: File | null;
  photoFile: File | null;
  signatureFile: File | null;
}

export default function CreateProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fileData, setFileData] = useState<FileData>({ governmentIdFile: null, photoFile: null, signatureFile: null });

  const [formData, setFormData] = useState<ProfileFormData>({
    // Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    nameAsPerID: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    placeOfBirth: "",
    bloodGroup: "",

    // Contact & Address
    permanentAddress: "",
    permanentCity: "",
    permanentState: "",
    permanentZip: "",
    currentAddress: "",
    currentCity: "",
    currentState: "",
    currentZip: "",
    primaryPhone: "",
    alternatePhone: "",
    email: "",
    communicationPreference: "",

    // Identity Documents
    panNumber: "",
    aadhaarNumber: "",
    voterIdNumber: "",
    passportNumber: "",
    governmentIdFile: "",
    photoFile: "",
    signatureFile: "",

    // Banking & Financial
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    creditCardNumber: "",
    cvv: "",
    monthlyIncome: "",
    annualIncome: "",
    incomeTaxPaid: "",
    occupation: "",
    employerName: "",
    employmentType: "",

    // Family & Nominee
    fatherName: "",
    motherName: "",
    spouseName: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    nomineeName: "",
    nomineeRelationship: "",
    nomineeDOB: "",

    // Health & Insurance
    healthInsuranceProvider: "",
    healthPolicyNumber: "",
    medicalHistory: "",
    allergies: "",
    ongoingMedications: "",
    dataConsent: false,

    // Additional Fields
    educationalQualification: "",
    formCategory: "",
    preferredLanguage: "",
    additionalNotes: "",
  })

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  const handleFileChange = (field: keyof FileData, file: File | null) => {
    setFileData((prev) => ({ ...prev, [field]: file }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      const requiredFields = [
        "firstName",
        "lastName",
        "nameAsPerID",
        "email",
        "primaryPhone",
        "dateOfBirth",
        "gender",
        "nationality",
        "permanentAddress",
        "permanentCity",
        "permanentState",
        "permanentZip",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field as keyof ProfileFormData]);

      if (missingFields.length > 0) {
        toast({
          title: "Missing Information",
          description: `Please fill in: ${missingFields.join(", ")}`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value.toString());
        }
      });

      Object.entries(fileData).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value);
        }
      });

      const res = await fetch('/api/profiles', {
        method: 'POST',
        body: formDataToSend,
      });

      if (res.status === 409) {
        const { message } = await res.json();
        toast({
          title: "Email Already Exists",
          description: message,
          variant: "destructive",
        });
      } else if (!res.ok) {
        throw new Error('Failed to create profile');
      } else {
        toast({
          title: "Profile Created",
          description: "Your identity profile has been saved successfully.",
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create Profile</h1>
            <p className="text-muted-foreground">Set up your identity profile for secure sharing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Basic personal details for identification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    value={formData.middleName}
                    onChange={(e) => handleInputChange("middleName", e.target.value)}
                    placeholder="Michael"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nameAsPerID">Name as per ID *</Label>
                  <Input
                    id="nameAsPerID"
                    value={formData.nameAsPerID}
                    onChange={(e) => handleInputChange("nameAsPerID", e.target.value)}
                    placeholder="John Michael Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => {
                      handleInputChange("dateOfBirth", e.target.value)
                      // Auto-calculate age
                      if (e.target.value) {
                        const today = new Date()
                        const birthDate = new Date(e.target.value)
                        const age = today.getFullYear() - birthDate.getFullYear()
                        const monthDiff = today.getMonth() - birthDate.getMonth()
                        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                          handleInputChange("age", (age - 1).toString())
                        } else {
                          handleInputChange("age", age.toString())
                        }
                      }
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" value={formData.age} readOnly placeholder="Auto-calculated" className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) => handleInputChange("maritalStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange("nationality", e.target.value)}
                    placeholder="Indian / American / British"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="placeOfBirth">Place of Birth</Label>
                  <Input
                    id="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                    placeholder="City, State, Country"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Address Details */}
          <Card>
            <CardHeader>
              <CardTitle>Contact & Address Details</CardTitle>
              <CardDescription>Permanent and current address information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Permanent Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="permanentAddress">Street Address *</Label>
                    <Input
                      id="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="permanentCity">City *</Label>
                    <Input
                      id="permanentCity"
                      value={formData.permanentCity}
                      onChange={(e) => handleInputChange("permanentCity", e.target.value)}
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="permanentState">State *</Label>
                    <Input
                      id="permanentState"
                      value={formData.permanentState}
                      onChange={(e) => handleInputChange("permanentState", e.target.value)}
                      placeholder="NY"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="permanentZip">ZIP Code *</Label>
                    <Input
                      id="permanentZip"
                      value={formData.permanentZip}
                      onChange={(e) => handleInputChange("permanentZip", e.target.value)}
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Current Address</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleInputChange("currentAddress", formData.permanentAddress)
                      handleInputChange("currentCity", formData.permanentCity)
                      handleInputChange("currentState", formData.permanentState)
                      handleInputChange("currentZip", formData.permanentZip)
                    }}
                  >
                    Same as Permanent
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentAddress">Street Address</Label>
                    <Input
                      id="currentAddress"
                      value={formData.currentAddress}
                      onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                      placeholder="456 Current Street"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentCity">City</Label>
                    <Input
                      id="currentCity"
                      value={formData.currentCity}
                      onChange={(e) => handleInputChange("currentCity", e.target.value)}
                      placeholder="Boston"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentState">State</Label>
                    <Input
                      id="currentState"
                      value={formData.currentState}
                      onChange={(e) => handleInputChange("currentState", e.target.value)}
                      placeholder="MA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentZip">ZIP Code</Label>
                    <Input
                      id="currentZip"
                      value={formData.currentZip}
                      onChange={(e) => handleInputChange("currentZip", e.target.value)}
                      placeholder="02101"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryPhone">Primary Phone *</Label>
                  <Input
                    id="primaryPhone"
                    type="tel"
                    value={formData.primaryPhone}
                    onChange={(e) => handleInputChange("primaryPhone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <Input
                    id="alternatePhone"
                    type="tel"
                    value={formData.alternatePhone}
                    onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                    placeholder="+1 (555) 987-6543"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="communicationPreference">Communication Preference</Label>
                  <Select
                    value={formData.communicationPreference}
                    onValueChange={(value) => handleInputChange("communicationPreference", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Identity Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Identity Documents</CardTitle>
              <CardDescription>Government issued identification documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange("panNumber", e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadhaarNumber">Aadhaar Number / SSN</Label>
                  <Input
                    id="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={(e) => handleInputChange("aadhaarNumber", e.target.value)}
                    placeholder="1234 5678 9012"
                    maxLength={12}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voterIdNumber">Voter ID Number</Label>
                  <Input
                    id="voterIdNumber"
                    value={formData.voterIdNumber}
                    onChange={(e) => handleInputChange("voterIdNumber", e.target.value.toUpperCase())}
                    placeholder="ABC1234567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input
                    id="passportNumber"
                    value={formData.passportNumber}
                    onChange={(e) => handleInputChange("passportNumber", e.target.value.toUpperCase())}
                    placeholder="A1234567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="governmentIdFile">Government ID Upload</Label>
                  <Input
                    id="governmentIdFile"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleFileChange("governmentIdFile", file || null);
                    }}
                  />
                  <p className="text-xs text-muted-foreground">Upload scan of government ID</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photoFile">Passport Photo</Label>
                  <Input
                    id="photoFile"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleFileChange("photoFile", file || null);
                    }}
                  />
                  <p className="text-xs text-muted-foreground">Passport-sized photo</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signatureFile">Digital Signature</Label>
                  <Input
                    id="signatureFile"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleFileChange("signatureFile", file || null);
                    }}
                  />
                  <p className="text-xs text-muted-foreground">Upload signature image</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banking & Financial Details */}
          <Card>
            <CardHeader>
              <CardTitle>Banking & Financial Details</CardTitle>
              <CardDescription>Financial and employment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange("bankName", e.target.value)}
                    placeholder="State Bank of India"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                    placeholder="1234567890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
                    placeholder="SBIN0001234"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={formData.annualIncome}
                    onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                    placeholder="600000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incomeTaxPaid">Income Tax Paid (Last Year)</Label>
                  <Input
                    id="incomeTaxPaid"
                    type="number"
                    value={formData.incomeTaxPaid}
                    onChange={(e) => handleInputChange("incomeTaxPaid", e.target.value)}
                    placeholder="50000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employerName">Employer Name</Label>
                  <Input
                    id="employerName"
                    value={formData.employerName}
                    onChange={(e) => handleInputChange("employerName", e.target.value)}
                    placeholder="Tech Company Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Select
                    value={formData.employmentType}
                    onValueChange={(value) => handleInputChange("employmentType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salaried">Salaried</SelectItem>
                      <SelectItem value="self-employed">Self-employed</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family & Nominee Details */}
          <Card>
            <CardHeader>
              <CardTitle>Family & Nominee Details</CardTitle>
              <CardDescription>Family members and emergency contacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father's Name</Label>
                  <Input
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange("fatherName", e.target.value)}
                    placeholder="Robert Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motherName">Mother's Name</Label>
                  <Input
                    id="motherName"
                    value={formData.motherName}
                    onChange={(e) => handleInputChange("motherName", e.target.value)}
                    placeholder="Mary Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spouseName">Spouse's Name</Label>
                  <Input
                    id="spouseName"
                    value={formData.spouseName}
                    onChange={(e) => handleInputChange("spouseName", e.target.value)}
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactNumber">Emergency Contact Number</Label>
                  <Input
                    id="emergencyContactNumber"
                    type="tel"
                    value={formData.emergencyContactNumber}
                    onChange={(e) => handleInputChange("emergencyContactNumber", e.target.value)}
                    placeholder="+1 (555) 987-6543"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nomineeName">Nominee Name</Label>
                  <Input
                    id="nomineeName"
                    value={formData.nomineeName}
                    onChange={(e) => handleInputChange("nomineeName", e.target.value)}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nomineeRelationship">Nominee Relationship</Label>
                  <Select
                    value={formData.nomineeRelationship}
                    onValueChange={(value) => handleInputChange("nomineeRelationship", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="son">Son</SelectItem>
                      <SelectItem value="daughter">Daughter</SelectItem>
                      <SelectItem value="brother">Brother</SelectItem>
                      <SelectItem value="sister">Sister</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nomineeDOB">Nominee Date of Birth</Label>
                  <Input
                    id="nomineeDOB"
                    type="date"
                    value={formData.nomineeDOB}
                    onChange={(e) => handleInputChange("nomineeDOB", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health & Insurance */}
          <Card>
            <CardHeader>
              <CardTitle>Health & Insurance</CardTitle>
              <CardDescription>Medical and insurance information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="healthInsuranceProvider">Health Insurance Provider</Label>
                  <Input
                    id="healthInsuranceProvider"
                    value={formData.healthInsuranceProvider}
                    onChange={(e) => handleInputChange("healthInsuranceProvider", e.target.value)}
                    placeholder="Blue Cross Blue Shield"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="healthPolicyNumber">Policy Number</Label>
                  <Input
                    id="healthPolicyNumber"
                    value={formData.healthPolicyNumber}
                    onChange={(e) => handleInputChange("healthPolicyNumber", e.target.value)}
                    placeholder="POL123456789"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                  placeholder="Previous surgeries, chronic conditions, etc."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => handleInputChange("allergies", e.target.value)}
                    placeholder="Food allergies, drug allergies, etc."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ongoingMedications">Ongoing Medications</Label>
                  <Textarea
                    id="ongoingMedications"
                    value={formData.ongoingMedications}
                    onChange={(e) => handleInputChange("ongoingMedications", e.target.value)}
                    placeholder="Current medications and dosages"
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="dataConsent"
                  checked={formData.dataConsent}
                  onChange={(e) => handleInputChange("dataConsent", e.target.checked.toString())}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="dataConsent" className="text-sm">
                  I consent to sharing my health data with authorized healthcare providers
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Additional Fields */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Educational and other details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="educationalQualification">Educational Qualification</Label>
                  <Select
                    value={formData.educationalQualification}
                    onValueChange={(value) => handleInputChange("educationalQualification", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredLanguage">Preferred Language</Label>
                  <Select
                    value={formData.preferredLanguage}
                    onValueChange={(value) => handleInputChange("preferredLanguage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="formCategory">Form Category</Label>
                <Select
                  value={formData.formCategory}
                  onValueChange={(value) => handleInputChange("formCategory", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banking">Banking</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="tax">Tax</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  placeholder="Any additional information or special requirements"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link href="/">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Creating..." : "Create Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
