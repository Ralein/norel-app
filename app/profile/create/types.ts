export interface ProfileFormData {
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
    profileType: string; // Personal/Business/Family/Dependent
}

export interface FileData {
    governmentIdFile: File | null;
    photoFile: File | null;
    signatureFile: File | null;
}
