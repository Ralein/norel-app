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
import { ArrowLeft, Save, User, CreditCard, Briefcase, GraduationCap, Heart, Users, Globe } from "lucide-react"
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
  religion: string;
  caste: string;
  subCaste: string;
  category: string; // General/OBC/SC/ST/EWS
  motherTongue: string;
  height: string;
  weight: string;
  distinguishingMarks: string;

  // Contact & Address
  permanentAddress: string;
  permanentCity: string;
  permanentState: string;
  permanentZip: string;
  permanentCountry: string;
  currentAddress: string;
  currentCity: string;
  currentState: string;
  currentZip: string;
  currentCountry: string;
  primaryPhone: string;
  alternatePhone: string;
  email: string;
  alternateEmail: string;
  communicationPreference: string;
  residenceType: string; // Own/Rent/Family
  yearsAtCurrentAddress: string;

  // Identity Documents
  panNumber: string;
  aadhaarNumber: string;
  voterIdNumber: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportIssuePlace: string;
  drivingLicenseNumber: string;
  dlIssueDate: string;
  dlExpiryDate: string;
  rationCardNumber: string;
  governmentIdFile: string;
  photoFile: string;
  signatureFile: string;

  // Banking & Financial
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  branchAddress: string;
  creditCardNumber: string;
  creditCardBank: string;
  cvv: string;
  cardExpiryDate: string;
  monthlyIncome: string;
  annualIncome: string;
  incomeTaxPaid: string;
  gstNumber: string;
  panCardName: string;
  
  // Employment Details
  occupation: string;
  employerName: string;
  employerAddress: string;
  employerPhone: string;
  employerEmail: string;
  employmentType: string;
  workExperience: string;
  designation: string;
  department: string;
  employeeId: string;
  joiningDate: string;
  workingHours: string;
  reportingManager: string;
  hrContactName: string;
  hrContactNumber: string;

  // Education Details
  educationalQualification: string;
  instituteName: string;
  courseCompleted: string;
  yearOfPassing: string;
  percentage: string;
  rollNumber: string;
  universityName: string;
  professionalCertifications: string;
  additionalSkills: string;

  // Family & Nominee
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  spouseName: string;
  spouseOccupation: string;
  spouseDateOfBirth: string;
  numberOfChildren: string;
  childrenNames: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyContactRelation: string;
  nomineeName: string;
  nomineeRelationship: string;
  nomineeDOB: string;
  nomineeAddress: string;
  nomineePhone: string;

  // Health & Insurance
  healthInsuranceProvider: string;
  healthPolicyNumber: string;
  policyStartDate: string;
  policyEndDate: string;
  sumInsured: string;
  medicalHistory: string;
  allergies: string;
  ongoingMedications: string;
  previousSurgeries: string;
  familyMedicalHistory: string;
  smokingHabits: string;
  drinkingHabits: string;
  exerciseRoutine: string;
  dataConsent: boolean;

  // Travel & Visa Information
  visaCountries: string;
  travelHistory: string;
  passportType: string;
  visaStatus: string;
  internationalAddress: string;

  // Property & Assets
  propertyOwned: string;
  propertyAddress: string;
  propertyValue: string;
  vehicleOwned: string;
  vehicleRegistration: string;
  vehicleInsurance: string;
  investmentDetails: string;
  fixedDeposits: string;
  mutualFunds: string;
  stockInvestments: string;

  // Legal & Compliance
  criminalRecord: string;
  pendingLitigation: string;
  bankruptcyHistory: string;
  taxCompliance: string;
  politicalExposure: string;

  // References
  reference1Name: string;
  reference1Phone: string;
  reference1Relation: string;
  reference1Address: string;
  reference2Name: string;
  reference2Phone: string;
  reference2Relation: string;
  reference2Address: string;

  // Additional Fields
  formCategory: string;
  preferredLanguage: string;
  additionalNotes: string;
  profileType: string; // Personal/Business/Family
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
    religion: "",
    caste: "",
    subCaste: "",
    category: "",
    motherTongue: "",
    height: "",
    weight: "",
    distinguishingMarks: "",

    // Contact & Address
    permanentAddress: "",
    permanentCity: "",
    permanentState: "",
    permanentZip: "",
    permanentCountry: "",
    currentAddress: "",
    currentCity: "",
    currentState: "",
    currentZip: "",
    currentCountry: "",
    primaryPhone: "",
    alternatePhone: "",
    email: "",
    alternateEmail: "",
    communicationPreference: "",
    residenceType: "",
    yearsAtCurrentAddress: "",

    // Identity Documents
    panNumber: "",
    aadhaarNumber: "",
    voterIdNumber: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    passportIssuePlace: "",
    drivingLicenseNumber: "",
    dlIssueDate: "",
    dlExpiryDate: "",
    rationCardNumber: "",
    governmentIdFile: "",
    photoFile: "",
    signatureFile: "",

    // Banking & Financial
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
    branchAddress: "",
    creditCardNumber: "",
    creditCardBank: "",
    cvv: "",
    cardExpiryDate: "",
    monthlyIncome: "",
    annualIncome: "",
    incomeTaxPaid: "",
    gstNumber: "",
    panCardName: "",

    // Employment Details
    occupation: "",
    employerName: "",
    employerAddress: "",
    employerPhone: "",
    employerEmail: "",
    employmentType: "",
    workExperience: "",
    designation: "",
    department: "",
    employeeId: "",
    joiningDate: "",
    workingHours: "",
    reportingManager: "",
    hrContactName: "",
    hrContactNumber: "",

    // Education Details
    educationalQualification: "",
    instituteName: "",
    courseCompleted: "",
    yearOfPassing: "",
    percentage: "",
    rollNumber: "",
    universityName: "",
    professionalCertifications: "",
    additionalSkills: "",

    // Family & Nominee
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    spouseName: "",
    spouseOccupation: "",
    spouseDateOfBirth: "",
    numberOfChildren: "",
    childrenNames: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelation: "",
    nomineeName: "",
    nomineeRelationship: "",
    nomineeDOB: "",
    nomineeAddress: "",
    nomineePhone: "",

    // Health & Insurance
    healthInsuranceProvider: "",
    healthPolicyNumber: "",
    policyStartDate: "",
    policyEndDate: "",
    sumInsured: "",
    medicalHistory: "",
    allergies: "",
    ongoingMedications: "",
    previousSurgeries: "",
    familyMedicalHistory: "",
    smokingHabits: "",
    drinkingHabits: "",
    exerciseRoutine: "",
    dataConsent: false,

    // Travel & Visa Information
    visaCountries: "",
    travelHistory: "",
    passportType: "",
    visaStatus: "",
    internationalAddress: "",

    // Property & Assets
    propertyOwned: "",
    propertyAddress: "",
    propertyValue: "",
    vehicleOwned: "",
    vehicleRegistration: "",
    vehicleInsurance: "",
    investmentDetails: "",
    fixedDeposits: "",
    mutualFunds: "",
    stockInvestments: "",

    // Legal & Compliance
    criminalRecord: "",
    pendingLitigation: "",
    bankruptcyHistory: "",
    taxCompliance: "",
    politicalExposure: "",

    // References
    reference1Name: "",
    reference1Phone: "",
    reference1Relation: "",
    reference1Address: "",
    reference2Name: "",
    reference2Phone: "",
    reference2Relation: "",
    reference2Address: "",

    // Additional Fields
    formCategory: "",
    preferredLanguage: "",
    additionalNotes: "",
    profileType: "",
  })

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  const handleFileChange = (field: keyof FileData, file: File | null) => {
    setFileData((prev) => ({ ...prev, [field]: file }));
  }

  const copyPermanentToCurrent = () => {
    handleInputChange("currentAddress", formData.permanentAddress)
    handleInputChange("currentCity", formData.permanentCity)
    handleInputChange("currentState", formData.permanentState)
    handleInputChange("currentZip", formData.permanentZip)
    handleInputChange("currentCountry", formData.permanentCountry)
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
            <p className="text-muted-foreground">Set up your comprehensive identity profile for secure sharing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
          {/* Profile Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Type
              </CardTitle>
              <CardDescription>Select the type of profile you're creating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="profileType">Profile Type</Label>
                <Select
                  value={formData.profileType}
                  onValueChange={(value) => handleInputChange("profileType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select profile type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="family">Family Member</SelectItem>
                    <SelectItem value="dependent">Dependent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

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
                      <SelectItem value="separated">Separated</SelectItem>
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

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Select value={formData.religion} onValueChange={(value) => handleInputChange("religion", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="muslim">Muslim</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="sikh">Sikh</SelectItem>
                      <SelectItem value="buddhist">Buddhist</SelectItem>
                      <SelectItem value="jain">Jain</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="obc">OBC</SelectItem>
                      <SelectItem value="sc">SC</SelectItem>
                      <SelectItem value="st">ST</SelectItem>
                      <SelectItem value="ews">EWS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motherTongue">Mother Tongue</Label>
                  <Input
                    id="motherTongue"
                    value={formData.motherTongue}
                    onChange={(e) => handleInputChange("motherTongue", e.target.value)}
                    placeholder="English / Hindi / Tamil"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="175"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="70"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caste">Caste</Label>
                  <Input
                    id="caste"
                    value={formData.caste}
                    onChange={(e) => handleInputChange("caste", e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subCaste">Sub-Caste</Label>
                  <Input
                    id="subCaste"
                    value={formData.subCaste}
                    onChange={(e) => handleInputChange("subCaste", e.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="distinguishingMarks">Distinguishing Marks</Label>
                <Textarea
                  id="distinguishingMarks"
                  value={formData.distinguishingMarks}
                  onChange={(e) => handleInputChange("distinguishingMarks", e.target.value)}
                  placeholder="Mole on left cheek, scar on right hand, etc."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact & Address Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Contact & Address Details
              </CardTitle>
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
                  <div className="space-y-2">
                    <Label htmlFor="permanentCountry">Country</Label>
                    <Input
                      id="permanentCountry"
                      value={formData.permanentCountry}
                      onChange={(e) => handleInputChange("permanentCountry", e.target.value)}
                      placeholder="India / United States"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="residenceType">Residence Type</Label>
                    <Select
                      value={formData.residenceType}
                      onValueChange={(value) => handleInputChange("residenceType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owned">Own</SelectItem>
                        <SelectItem value="rented">Rented</SelectItem>
                        <SelectItem value="family">Family Property</SelectItem>
                        <SelectItem value="company">Company Provided</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsAtCurrentAddress">Years at Current Address</Label>
                  <Input
                    id="yearsAtCurrentAddress"
                    type="number"
                    value={formData.yearsAtCurrentAddress}
                    onChange={(e) => handleInputChange("yearsAtCurrentAddress", e.target.value)}
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Current Address</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copyPermanentToCurrent}
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
                  <div className="space-y-2">
                    <Label htmlFor="currentCountry">Country</Label>
                    <Input
                      id="currentCountry"
                      value={formData.currentCountry}
                      onChange={(e) => handleInputChange("currentCountry", e.target.value)}
                      placeholder="India / United States"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                  <Label htmlFor="alternateEmail">Alternate Email</Label>
                  <Input
                    id="alternateEmail"
                    type="email"
                    value={formData.alternateEmail}
                    onChange={(e) => handleInputChange("alternateEmail", e.target.value)}
                    placeholder="john.alternate@example.com"
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
                      <SelectItem value="postal">Postal Mail</SelectItem>
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
                  <Label htmlFor="panCardName">PAN Card Name</Label>
                  <Input
                    id="panCardName"
                    value={formData.panCardName}
                    onChange={(e) => handleInputChange("panCardName", e.target.value)}
                    placeholder="Name as per PAN Card"
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input
                    id="passportNumber"
                    value={formData.passportNumber}
                    onChange={(e) => handleInputChange("passportNumber", e.target.value.toUpperCase())}
                    placeholder="A1234567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passportIssueDate">Passport Issue Date</Label>
                  <Input
                    id="passportIssueDate"
                    type="date"
                    value={formData.passportIssueDate}
                    onChange={(e) => handleInputChange("passportIssueDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passportExpiryDate">Passport Expiry Date</Label>
                  <Input
                    id="passportExpiryDate"
                    type="date"
                    value={formData.passportExpiryDate}
                    onChange={(e) => handleInputChange("passportExpiryDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passportIssuePlace">Passport Issue Place</Label>
                  <Input
                    id="passportIssuePlace"
                    value={formData.passportIssuePlace}
                    onChange={(e) => handleInputChange("passportIssuePlace", e.target.value)}
                    placeholder="Mumbai / New York"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passportType">Passport Type</Label>
                  <Select
                    value={formData.passportType}
                    onValueChange={(value) => handleInputChange("passportType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ordinary">Ordinary</SelectItem>
                      <SelectItem value="diplomatic">Diplomatic</SelectItem>
                      <SelectItem value="official">Official</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rationCardNumber">Ration Card Number</Label>
                  <Input
                    id="rationCardNumber"
                    value={formData.rationCardNumber}
                    onChange={(e) => handleInputChange("rationCardNumber", e.target.value)}
                    placeholder="RATION123456"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="drivingLicenseNumber">Driving License Number</Label>
                  <Input
                    id="drivingLicenseNumber"
                    value={formData.drivingLicenseNumber}
                    onChange={(e) => handleInputChange("drivingLicenseNumber", e.target.value.toUpperCase())}
                    placeholder="DL123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dlIssueDate">DL Issue Date</Label>
                  <Input
                    id="dlIssueDate"
                    type="date"
                    value={formData.dlIssueDate}
                    onChange={(e) => handleInputChange("dlIssueDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dlExpiryDate">DL Expiry Date</Label>
                  <Input
                    id="dlExpiryDate"
                    type="date"
                    value={formData.dlExpiryDate}
                    onChange={(e) => handleInputChange("dlExpiryDate", e.target.value)}
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
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Banking & Financial Details
              </CardTitle>
              <CardDescription>Financial and banking information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select
                    value={formData.accountType}
                    onValueChange={(value) => handleInputChange("accountType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="nri">NRI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="branchAddress">Branch Address</Label>
                  <Textarea
                    id="branchAddress"
                    value={formData.branchAddress}
                    onChange={(e) => handleInputChange("branchAddress", e.target.value)}
                    placeholder="Branch full address"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    value={formData.gstNumber}
                    onChange={(e) => handleInputChange("gstNumber", e.target.value.toUpperCase())}
                    placeholder="07AAGFF2194N1Z1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="creditCardNumber">Credit Card Number</Label>
                  <Input
                    id="creditCardNumber"
                    value={formData.creditCardNumber}
                    onChange={(e) => handleInputChange("creditCardNumber", e.target.value)}
                    placeholder="**** **** **** 1234"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditCardBank">Credit Card Bank</Label>
                  <Input
                    id="creditCardBank"
                    value={formData.creditCardBank}
                    onChange={(e) => handleInputChange("creditCardBank", e.target.value)}
                    placeholder="HDFC Bank"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardExpiryDate">Card Expiry Date</Label>
                  <Input
                    id="cardExpiryDate"
                    type="month"
                    value={formData.cardExpiryDate}
                    onChange={(e) => handleInputChange("cardExpiryDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income (₹)</Label>
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
            </CardContent>
          </Card>

          {/* Employment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Employment Details
              </CardTitle>
              <CardDescription>Work and employment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={formData.designation}
                    onChange={(e) => handleInputChange("designation", e.target.value)}
                    placeholder="Senior Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    placeholder="Engineering"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <SelectItem value="permanent">Permanent</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="consultant">Consultant</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="self-employed">Self-employed</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="employerAddress">Employer Address</Label>
                  <Textarea
                    id="employerAddress"
                    value={formData.employerAddress}
                    onChange={(e) => handleInputChange("employerAddress", e.target.value)}
                    placeholder="Company full address"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workExperience">Work Experience (Years)</Label>
                  <Input
                    id="workExperience"
                    type="number"
                    value={formData.workExperience}
                    onChange={(e) => handleInputChange("workExperience", e.target.value)}
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange("employeeId", e.target.value)}
                    placeholder="EMP001234"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joiningDate">Joining Date</Label>
                  <Input
                    id="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => handleInputChange("joiningDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workingHours">Working Hours</Label>
                  <Input
                    id="workingHours"
                    value={formData.workingHours}
                    onChange={(e) => handleInputChange("workingHours", e.target.value)}
                    placeholder="9 AM - 6 PM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportingManager">Reporting Manager</Label>
                  <Input
                    id="reportingManager"
                    value={formData.reportingManager}
                    onChange={(e) => handleInputChange("reportingManager", e.target.value)}
                    placeholder="Jane Smith"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="employerPhone">Employer Phone</Label>
                  <Input
                    id="employerPhone"
                    type="tel"
                    value={formData.employerPhone}
                    onChange={(e) => handleInputChange("employerPhone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employerEmail">Employer Email</Label>
                  <Input
                    id="employerEmail"
                    type="email"
                    value={formData.employerEmail}
                    onChange={(e) => handleInputChange("employerEmail", e.target.value)}
                    placeholder="hr@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hrContactName">HR Contact Name</Label>
                  <Input
                    id="hrContactName"
                    value={formData.hrContactName}
                    onChange={(e) => handleInputChange("hrContactName", e.target.value)}
                    placeholder="HR Manager Name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hrContactNumber">HR Contact Number</Label>
                <Input
                  id="hrContactNumber"
                  type="tel"
                  value={formData.hrContactNumber}
                  onChange={(e) => handleInputChange("hrContactNumber", e.target.value)}
                  placeholder="+1 (555) 987-6543"
                />
              </div>
            </CardContent>
          </Card>

          {/* Education Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education Details
              </CardTitle>
              <CardDescription>Educational qualifications and certifications</CardDescription>
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
                      <SelectItem value="10th">10th Pass</SelectItem>
                      <SelectItem value="12th">12th Pass</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="professional">Professional Degree</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseCompleted">Course Completed</Label>
                  <Input
                    id="courseCompleted"
                    value={formData.courseCompleted}
                    onChange={(e) => handleInputChange("courseCompleted", e.target.value)}
                    placeholder="B.Tech Computer Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="instituteName">Institute Name</Label>
                  <Input
                    id="instituteName"
                    value={formData.instituteName}
                    onChange={(e) => handleInputChange("instituteName", e.target.value)}
                    placeholder="Indian Institute of Technology"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="universityName">University Name</Label>
                  <Input
                    id="universityName"
                    value={formData.universityName}
                    onChange={(e) => handleInputChange("universityName", e.target.value)}
                    placeholder="University of Delhi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="yearOfPassing">Year of Passing</Label>
                  <Input
                    id="yearOfPassing"
                    type="number"
                    value={formData.yearOfPassing}
                    onChange={(e) => handleInputChange("yearOfPassing", e.target.value)}
                    placeholder="2020"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="percentage">Percentage/Grade</Label>
                  <Input
                    id="percentage"
                    value={formData.percentage}
                    onChange={(e) => handleInputChange("percentage", e.target.value)}
                    placeholder="85% / 8.5 GPA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    value={formData.rollNumber}
                    onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                    placeholder="ROLL123456"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="professionalCertifications">Professional Certifications</Label>
                  <Textarea
                    id="professionalCertifications"
                    value={formData.professionalCertifications}
                    onChange={(e) => handleInputChange("professionalCertifications", e.target.value)}
                    placeholder="AWS Certified, Google Cloud Professional, etc."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalSkills">Additional Skills</Label>
                  <Textarea
                    id="additionalSkills"
                    value={formData.additionalSkills}
                    onChange={(e) => handleInputChange("additionalSkills", e.target.value)}
                    placeholder="Programming languages, software proficiency, etc."
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family & Nominee Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Family & Nominee Details
              </CardTitle>
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
                  <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                  <Input
                    id="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={(e) => handleInputChange("fatherOccupation", e.target.value)}
                    placeholder="Engineer"
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                  <Input
                    id="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={(e) => handleInputChange("motherOccupation", e.target.value)}
                    placeholder="Teacher"
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
                <div className="space-y-2">
                  <Label htmlFor="spouseOccupation">Spouse's Occupation</Label>
                  <Input
                    id="spouseOccupation"
                    value={formData.spouseOccupation}
                    onChange={(e) => handleInputChange("spouseOccupation", e.target.value)}
                    placeholder="Doctor"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="spouseDateOfBirth">Spouse's Date of Birth</Label>
                  <Input
                    id="spouseDateOfBirth"
                    type="date"
                    value={formData.spouseDateOfBirth}
                    onChange={(e) => handleInputChange("spouseDateOfBirth", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numberOfChildren">Number of Children</Label>
                  <Input
                    id="numberOfChildren"
                    type="number"
                    value={formData.numberOfChildren}
                    onChange={(e) => handleInputChange("numberOfChildren", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childrenNames">Children Names</Label>
                  <Input
                    id="childrenNames"
                    value={formData.childrenNames}
                    onChange={(e) => handleInputChange("childrenNames", e.target.value)}
                    placeholder="Child1, Child2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactRelation">Emergency Contact Relation</Label>
                  <Select
                    value={formData.emergencyContactRelation}
                    onValueChange={(value) => handleInputChange("emergencyContactRelation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="relative">Relative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                <div className="space-y-2">
                  <Label htmlFor="nomineePhone">Nominee Phone</Label>
                  <Input
                    id="nomineePhone"
                    type="tel"
                    value={formData.nomineePhone}
                    onChange={(e) => handleInputChange("nomineePhone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomineeAddress">Nominee Address</Label>
                <Textarea
                  id="nomineeAddress"
                  value={formData.nomineeAddress}
                  onChange={(e) => handleInputChange("nomineeAddress", e.target.value)}
                  placeholder="Complete address of nominee"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Health & Insurance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Health & Insurance
              </CardTitle>
              <CardDescription>Medical and insurance information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <div className="space-y-2">
                  <Label htmlFor="sumInsured">Sum Insured (₹)</Label>
                  <Input
                    id="sumInsured"
                    type="number"
                    value={formData.sumInsured}
                    onChange={(e) => handleInputChange("sumInsured", e.target.value)}
                    placeholder="500000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="policyStartDate">Policy Start Date</Label>
                  <Input
                    id="policyStartDate"
                    type="date"
                    value={formData.policyStartDate}
                    onChange={(e) => handleInputChange("policyStartDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="policyEndDate">Policy End Date</Label>
                  <Input
                    id="policyEndDate"
                    type="date"
                    value={formData.policyEndDate}
                    onChange={(e) => handleInputChange("policyEndDate", e.target.value)}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="previousSurgeries">Previous Surgeries</Label>
                  <Textarea
                    id="previousSurgeries"
                    value={formData.previousSurgeries}
                    onChange={(e) => handleInputChange("previousSurgeries", e.target.value)}
                    placeholder="Any past surgical procedures"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="familyMedicalHistory">Family Medical History</Label>
                  <Textarea
                    id="familyMedicalHistory"
                    value={formData.familyMedicalHistory}
                    onChange={(e) => handleInputChange("familyMedicalHistory", e.target.value)}
                    placeholder="Hereditary conditions, family health history"
                    rows={2}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smokingHabits">Smoking Habits</Label>
                  <Select
                    value={formData.smokingHabits}
                    onValueChange={(value) => handleInputChange("smokingHabits", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select habit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never Smoked</SelectItem>
                      <SelectItem value="former">Former Smoker</SelectItem>
                      <SelectItem value="occasional">Occasional</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drinkingHabits">Drinking Habits</Label>
                  <Select
                    value={formData.drinkingHabits}
                    onValueChange={(value) => handleInputChange("drinkingHabits", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select habit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="social">Social Drinker</SelectItem>
                      <SelectItem value="occasional">Occasional</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exerciseRoutine">Exercise Routine</Label>
                  <Input
                    id="exerciseRoutine"
                    value={formData.exerciseRoutine}
                    onChange={(e) => handleInputChange("exerciseRoutine", e.target.value)}
                    placeholder="Daily walking, gym 3x week"
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

          {/* Travel & Visa Information */}
          <Card>
            <CardHeader>
              <CardTitle>Travel & Visa Information</CardTitle>
              <CardDescription>International travel and visa details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="visaStatus">Visa Status</Label>
                  <Select
                    value={formData.visaStatus}
                    onValueChange={(value) => handleInputChange("visaStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citizen">Citizen</SelectItem>
                      <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                      <SelectItem value="work-visa">Work Visa</SelectItem>
                      <SelectItem value="student-visa">Student Visa</SelectItem>
                      <SelectItem value="tourist-visa">Tourist Visa</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visaCountries">Countries with Valid Visa</Label>
                  <Input
                    id="visaCountries"
                    value={formData.visaCountries}
                    onChange={(e) => handleInputChange("visaCountries", e.target.value)}
                    placeholder="USA, UK, Canada"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="travelHistory">Travel History</Label>
                  <Textarea
                    id="travelHistory"
                    value={formData.travelHistory}
                    onChange={(e) => handleInputChange("travelHistory", e.target.value)}
                    placeholder="Countries visited, dates of travel"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="internationalAddress">International Address</Label>
                  <Textarea
                    id="internationalAddress"
                    value={formData.internationalAddress}
                    onChange={(e) => handleInputChange("internationalAddress", e.target.value)}
                    placeholder="Address in foreign country (if applicable)"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property & Assets */}
          <Card>
            <CardHeader>
              <CardTitle>Property & Assets</CardTitle>
              <CardDescription>Real estate and investment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyOwned">Property Owned</Label>
                  <Select
                    value={formData.propertyOwned}
                    onValueChange={(value) => handleInputChange("propertyOwned", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                      <SelectItem value="land">Land Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyValue">Property Value (₹)</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    value={formData.propertyValue}
                    onChange={(e) => handleInputChange("propertyValue", e.target.value)}
                    placeholder="2500000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleOwned">Vehicle Owned</Label>
                  <Input
                    id="vehicleOwned"
                    value={formData.vehicleOwned}
                    onChange={(e) => handleInputChange("vehicleOwned", e.target.value)}
                    placeholder="Car, Bike, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyAddress">Property Address</Label>
                  <Textarea
                    id="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                    placeholder="Complete address of owned property"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleRegistration">Vehicle Registration</Label>
                  <Input
                    id="vehicleRegistration"
                    value={formData.vehicleRegistration}
                    onChange={(e) => handleInputChange("vehicleRegistration", e.target.value)}
                    placeholder="MH01AB1234"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vehicleInsurance">Vehicle Insurance</Label>
                  <Input
                    id="vehicleInsurance"
                    value={formData.vehicleInsurance}
                    onChange={(e) => handleInputChange("vehicleInsurance", e.target.value)}
                    placeholder="Policy number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fixedDeposits">Fixed Deposits (₹)</Label>
                  <Input
                    id="fixedDeposits"
                    type="number"
                    value={formData.fixedDeposits}
                    onChange={(e) => handleInputChange("fixedDeposits", e.target.value)}
                    placeholder="100000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mutualFunds">Mutual Funds (₹)</Label>
                  <Input
                    id="mutualFunds"
                    type="number"
                    value={formData.mutualFunds}
                    onChange={(e) => handleInputChange("mutualFunds", e.target.value)}
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stockInvestments">Stock Investments (₹)</Label>
                  <Input
                    id="stockInvestments"
                    type="number"
                    value={formData.stockInvestments}
                    onChange={(e) => handleInputChange("stockInvestments", e.target.value)}
                    placeholder="75000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentDetails">Investment Details</Label>
                <Textarea
                  id="investmentDetails"
                  value={formData.investmentDetails}
                  onChange={(e) => handleInputChange("investmentDetails", e.target.value)}
                  placeholder="Detailed breakdown of investments, portfolio details"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Legal & Compliance */}
          <Card>
            <CardHeader>
              <CardTitle>Legal & Compliance</CardTitle>
              <CardDescription>Legal history and compliance information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="criminalRecord">Criminal Record</Label>
                  <Select
                    value={formData.criminalRecord}
                    onValueChange={(value) => handleInputChange("criminalRecord", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="minor">Minor Offenses</SelectItem>
                      <SelectItem value="major">Major Offenses</SelectItem>
                      <SelectItem value="pending">Cases Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pendingLitigation">Pending Litigation</Label>
                  <Select
                    value={formData.pendingLitigation}
                    onValueChange={(value) => handleInputChange("pendingLitigation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="civil">Civil Cases</SelectItem>
                      <SelectItem value="criminal">Criminal Cases</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bankruptcyHistory">Bankruptcy History</Label>
                  <Select
                    value={formData.bankruptcyHistory}
                    onValueChange={(value) => handleInputChange("bankruptcyHistory", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="past">Past Bankruptcy</SelectItem>
                      <SelectItem value="current">Current Proceedings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxCompliance">Tax Compliance</Label>
                  <Select
                    value={formData.taxCompliance}
                    onValueChange={(value) => handleInputChange("taxCompliance", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliant">Fully Compliant</SelectItem>
                      <SelectItem value="pending">Returns Pending</SelectItem>
                      <SelectItem value="issues">Tax Issues</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="politicalExposure">Political Exposure</Label>
                  <Select
                    value={formData.politicalExposure}
                    onValueChange={(value) => handleInputChange("politicalExposure", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="self">Self</SelectItem>
                      <SelectItem value="family">Family Member</SelectItem>
                      <SelectItem value="associate">Close Associate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* References */}
          <Card>
            <CardHeader>
              <CardTitle>References</CardTitle>
              <CardDescription>Personal and professional references</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Reference 1</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="reference1Name">Name</Label>
                    <Input
                      id="reference1Name"
                      value={formData.reference1Name}
                      onChange={(e) => handleInputChange("reference1Name", e.target.value)}
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference1Phone">Phone</Label>
                    <Input
                      id="reference1Phone"
                      type="tel"
                      value={formData.reference1Phone}
                      onChange={(e) => handleInputChange("reference1Phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference1Relation">Relation</Label>
                    <Input
                      id="reference1Relation"
                      value={formData.reference1Relation}
                      onChange={(e) => handleInputChange("reference1Relation", e.target.value)}
                      placeholder="Colleague / Friend"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference1Address">Address</Label>
                    <Input
                      id="reference1Address"
                      value={formData.reference1Address}
                      onChange={(e) => handleInputChange("reference1Address", e.target.value)}
                      placeholder="Complete address"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Reference 2</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="reference2Name">Name</Label>
                    <Input
                      id="reference2Name"
                      value={formData.reference2Name}
                      onChange={(e) => handleInputChange("reference2Name", e.target.value)}
                      placeholder="Mary Johnson"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference2Phone">Phone</Label>
                    <Input
                      id="reference2Phone"
                      type="tel"
                      value={formData.reference2Phone}
                      onChange={(e) => handleInputChange("reference2Phone", e.target.value)}
                      placeholder="+1 (555) 987-6543"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference2Relation">Relation</Label>
                    <Input
                      id="reference2Relation"
                      value={formData.reference2Relation}
                      onChange={(e) => handleInputChange("reference2Relation", e.target.value)}
                      placeholder="Manager / Neighbor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference2Address">Address</Label>
                    <Input
                      id="reference2Address"
                      value={formData.reference2Address}
                      onChange={(e) => handleInputChange("reference2Address", e.target.value)}
                      placeholder="Complete address"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Fields */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Other preferences and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <SelectItem value="banking">Banking & Finance</SelectItem>
                      <SelectItem value="medical">Medical & Health</SelectItem>
                      <SelectItem value="government">Government & Legal</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="employment">Employment</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="travel">Travel & Visa</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
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
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="marathi">Marathi</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                      <SelectItem value="gujarati">Gujarati</SelectItem>
                      <SelectItem value="kannada">Kannada</SelectItem>
                      <SelectItem value="malayalam">Malayalam</SelectItem>
                      <SelectItem value="punjabi">Punjabi</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  placeholder="Any additional information, special requirements, or notes that might be relevant for form filling"
                  rows={4}
                />
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Data Security & Privacy</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your information is encrypted and stored securely. Only you can access your profile data, and it will only be used for the forms you explicitly choose to generate.
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    required
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="privacyConsent" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy, and consent to the secure storage and processing of my personal information for form generation purposes only.
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pb-8">
            <Link href="/">
              <Button variant="outline" size="lg">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isLoading} size="lg" className="min-w-[140px]">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Creating..." : "Create Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}