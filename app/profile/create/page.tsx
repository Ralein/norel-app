"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuth } from "@/hooks/use-auth"
import { ProfileFormData, FileData } from "./types"
import dynamic from 'next/dynamic'
import { Skeleton } from "@/components/ui/skeleton"

const ProfileType = dynamic(() => import("./components/profile-type").then(mod => mod.ProfileType), {
  loading: () => <Skeleton className="w-full h-[200px]" />,
})
const PersonalInformation = dynamic(() => import("./components/personal-info").then(mod => mod.PersonalInformation), {
  loading: () => <Skeleton className="w-full h-[600px]" />,
})
const ContactAddress = dynamic(() => import("./components/contact-info").then(mod => mod.ContactAddress), {
  loading: () => <Skeleton className="w-full h-[400px]" />,
})
const IdentityDocuments = dynamic(() => import("./components/identity-docs").then(mod => mod.IdentityDocuments), {
  loading: () => <Skeleton className="w-full h-[400px]" />,
})
const BankingFinancial = dynamic(() => import("./components/banking-info").then(mod => mod.BankingFinancial), {
  loading: () => <Skeleton className="w-full h-[400px]" />,
})
const EmploymentDetails = dynamic(() => import("./components/employment-info").then(mod => mod.EmploymentDetails), {
  loading: () => <Skeleton className="w-full h-[400px]" />,
})
const EducationDetails = dynamic(() => import("./components/education-info").then(mod => mod.EducationDetails), {
  loading: () => <Skeleton className="w-full h-[400px]" />,
})
const FamilyNominee = dynamic(() => import("./components/family-info").then(mod => mod.FamilyNominee), {
  loading: () => <Skeleton className="w-full h-[400px]" />,
})
const HealthInsurance = dynamic(() => import("./components/health-info").then(mod => mod.HealthInsurance), {
  loading: () => <Skeleton className="w-full h-[400px]" />,
})
const TravelVisa = dynamic(() => import("./components/travel-info").then(mod => mod.TravelVisa), {
  loading: () => <Skeleton className="w-full h-[200px]" />,
})
const PropertyAssets = dynamic(() => import("./components/property-info").then(mod => mod.PropertyAssets), {
  loading: () => <Skeleton className="w-full h-[400px]" />,
})
const LegalCompliance = dynamic(() => import("./components/legal-info").then(mod => mod.LegalCompliance), {
  loading: () => <Skeleton className="w-full h-[200px]" />,
})
const References = dynamic(() => import("./components/references").then(mod => mod.References), {
  loading: () => <Skeleton className="w-full h-[300px]" />,
})
const AdditionalFields = dynamic(() => import("./components/additional-info").then(mod => mod.AdditionalFields), {
  loading: () => <Skeleton className="w-full h-[300px]" />,
})

export default function CreateProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user: firebaseUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      let currentUid = firebaseUser?.uid;

      if (!firebaseUser) {
        if (password !== confirmPassword) {
          toast({
            title: "Passwords do not match",
            description: "Please make sure your passwords match.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, password);
        currentUid = userCredential.user.uid;
      }

      if (!currentUid) {
        toast({
          title: "Authentication Error",
          description: "Could not get user ID. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const requiredFields = [
        "firstName", "lastName", "nameAsPerID", "email", "primaryPhone",
        "dateOfBirth", "gender", "nationality", "permanentAddress",
        "permanentCity", "permanentState", "permanentZip",
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
      formDataToSend.append("uid", currentUid);

      Object.entries(fileData).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value);
        }
      });

      const res = await fetch('/api/profiles', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!res.ok) {
        throw new Error('Failed to create profile');
      }
      else {
        toast({
          title: "Profile Created",
          description: "Your identity profile has been saved successfully.",
        });
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'code' in error && typeof (error as any).code === 'string') {
        const firebaseError = error as any;
        if (firebaseError.code === 'auth/weak-password') {
          toast({
            title: "Weak Password",
            description: "Password should be at least 6 characters.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: `Failed to create profile: ${firebaseError.message || "An unknown error occurred."}`,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to create profile. Please try again.",
          variant: "destructive",
        });
      }
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
          <ProfileType formData={formData} handleInputChange={handleInputChange} />

          <PersonalInformation
            formData={formData}
            handleInputChange={handleInputChange}
            firebaseUser={firebaseUser}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />

          <ContactAddress
            formData={formData}
            handleInputChange={handleInputChange}
            copyPermanentToCurrent={copyPermanentToCurrent}
          />

          <IdentityDocuments
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
          />

          <BankingFinancial formData={formData} handleInputChange={handleInputChange} />

          <EmploymentDetails formData={formData} handleInputChange={handleInputChange} />

          <EducationDetails formData={formData} handleInputChange={handleInputChange} />

          <FamilyNominee formData={formData} handleInputChange={handleInputChange} />

          <HealthInsurance formData={formData} handleInputChange={handleInputChange} />

          <TravelVisa formData={formData} handleInputChange={handleInputChange} />

          <PropertyAssets formData={formData} handleInputChange={handleInputChange} />

          <LegalCompliance formData={formData} handleInputChange={handleInputChange} />

          <References formData={formData} handleInputChange={handleInputChange} />

          <AdditionalFields formData={formData} handleInputChange={handleInputChange} />

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pb-8">
            <Link href="/">
              <Button variant="outline" size="lg" type="button">Cancel</Button>
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
