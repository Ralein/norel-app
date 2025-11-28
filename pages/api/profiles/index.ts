import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), '/public/uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable({ uploadDir, keepExtensions: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
};

const getProfileData = (fields: formidable.Fields, files: formidable.Files): { [key: string]: any } => {
  const profileData: { [key: string]: any } = {};
  for (const key in fields) {
    if (Array.isArray(fields[key])) {
      profileData[key] = fields[key][0];
    } else {
      profileData[key] = fields[key];
    }
  }

  for (const key in files) {
    const file = files[key];
    if (file) {
      const f = Array.isArray(file) ? file[0] : file;
      profileData[key] = `/uploads/${f.newFilename}`;
    }
  }
  return profileData;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const profiles = await prisma.profile.findMany();
        res.status(200).json(profiles);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching profiles' });
      }
      break;
    case 'POST':
      try {
        const { fields, files } = await parseForm(req);
        const profileData = getProfileData(fields, files);
        
        if (!profileData.uid) {
          return res.status(400).json({ message: 'Missing uid' });
        }

        const profile = await prisma.profile.create({
          data: {
            uid: String(profileData.uid),
            firstName: String(profileData.firstName),
            middleName: profileData.middleName ? String(profileData.middleName) : null,
            lastName: String(profileData.lastName),
            nameAsPerID: String(profileData.nameAsPerID),
            dateOfBirth: String(profileData.dateOfBirth),
            age: profileData.age ? String(profileData.age) : null,
            gender: String(profileData.gender),
            maritalStatus: profileData.maritalStatus ? String(profileData.maritalStatus) : null,
            nationality: String(profileData.nationality),
            placeOfBirth: profileData.placeOfBirth ? String(profileData.placeOfBirth) : null,
            bloodGroup: profileData.bloodGroup ? String(profileData.bloodGroup) : null,
            permanentAddress: String(profileData.permanentAddress),
            permanentCity: String(profileData.permanentCity),
            permanentState: String(profileData.permanentState),
            permanentZip: String(profileData.permanentZip),
            currentAddress: profileData.currentAddress ? String(profileData.currentAddress) : null,
            currentCity: profileData.currentCity ? String(profileData.currentCity) : null,
            currentState: profileData.currentState ? String(profileData.currentState) : null,
            currentZip: profileData.currentZip ? String(profileData.currentZip) : null,
            primaryPhone: String(profileData.primaryPhone),
            alternatePhone: profileData.alternatePhone ? String(profileData.alternatePhone) : null,
            email: String(profileData.email),
            communicationPreference: profileData.communicationPreference ? String(profileData.communicationPreference) : null,
            panNumber: profileData.panNumber ? String(profileData.panNumber) : null,
            aadhaarNumber: profileData.aadhaarNumber ? String(profileData.aadhaarNumber) : null,
            voterIdNumber: profileData.voterIdNumber ? String(profileData.voterIdNumber) : null,
            passportNumber: profileData.passportNumber ? String(profileData.passportNumber) : null,
            governmentIdFile: profileData.governmentIdFile ? String(profileData.governmentIdFile) : null,
            photoFile: profileData.photoFile ? String(profileData.photoFile) : null,
            signatureFile: profileData.signatureFile ? String(profileData.signatureFile) : null,
            bankName: profileData.bankName ? String(profileData.bankName) : null,
            accountNumber: profileData.accountNumber ? String(profileData.accountNumber) : null,
            ifscCode: profileData.ifscCode ? String(profileData.ifscCode) : null,
            creditCardNumber: profileData.creditCardNumber ? String(profileData.creditCardNumber) : null,
            cvv: profileData.cvv ? String(profileData.cvv) : null,
            monthlyIncome: profileData.monthlyIncome ? String(profileData.monthlyIncome) : null,
            annualIncome: profileData.annualIncome ? String(profileData.annualIncome) : null,
            incomeTaxPaid: profileData.incomeTaxPaid ? String(profileData.incomeTaxPaid) : null,
            occupation: profileData.occupation ? String(profileData.occupation) : null,
            employerName: profileData.employerName ? String(profileData.employerName) : null,
            employmentType: profileData.employmentType ? String(profileData.employmentType) : null,
            fatherName: profileData.fatherName ? String(profileData.fatherName) : null,
            motherName: profileData.motherName ? String(profileData.motherName) : null,
            spouseName: profileData.spouseName ? String(profileData.spouseName) : null,
            emergencyContactName: profileData.emergencyContactName ? String(profileData.emergencyContactName) : null,
            emergencyContactNumber: profileData.emergencyContactNumber ? String(profileData.emergencyContactNumber) : null,
            nomineeName: profileData.nomineeName ? String(profileData.nomineeName) : null,
            nomineeRelationship: profileData.nomineeRelationship ? String(profileData.nomineeRelationship) : null,
            nomineeDOB: profileData.nomineeDOB ? String(profileData.nomineeDOB) : null,
            healthInsuranceProvider: profileData.healthInsuranceProvider ? String(profileData.healthInsuranceProvider) : null,
            healthPolicyNumber: profileData.healthPolicyNumber ? String(profileData.healthPolicyNumber) : null,
            medicalHistory: profileData.medicalHistory ? String(profileData.medicalHistory) : null,
            allergies: profileData.allergies ? String(profileData.allergies) : null,
            ongoingMedications: profileData.ongoingMedications ? String(profileData.ongoingMedications) : null,
            dataConsent: profileData.dataConsent ? Boolean(profileData.dataConsent) : null,
            educationalQualification: profileData.educationalQualification ? String(profileData.educationalQualification) : null,
            formCategory: profileData.formCategory ? String(profileData.formCategory) : null,
            preferredLanguage: profileData.preferredLanguage ? String(profileData.preferredLanguage) : null,
            additionalNotes: profileData.additionalNotes ? String(profileData.additionalNotes) : null,
            createdAt: new Date()
          }
        });
        res.status(201).json({ message: 'Profile created successfully', id: profile.id });
      } catch (error: any) {
        console.error(error);
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
          return res.status(409).json({ message: 'A profile with this email already exists.' });
        }
        if (error instanceof formidable.errors.FormidableError) {
            return res.status(500).json({ message: 'Error parsing the form data' });
        }
        res.status(500).json({ message: 'Failed to create profile' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}