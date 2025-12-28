import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';
import type { Prisma } from '@prisma/client';

const profileFields = [
  'uid', 'firstName', 'middleName', 'lastName', 'nameAsPerID', 'dateOfBirth', 'age', 'gender',
  'maritalStatus', 'nationality', 'placeOfBirth', 'bloodGroup', 'permanentAddress', 'permanentCity',
  'permanentState', 'permanentZip', 'currentAddress', 'currentCity', 'currentState', 'currentZip',
  'primaryPhone', 'alternatePhone', 'email', 'communicationPreference', 'panNumber', 'aadhaarNumber',
  'voterIdNumber', 'passportNumber', 'governmentIdFile', 'photoFile', 'signatureFile', 'bankName',
  'accountNumber', 'ifscCode', 'creditCardNumber', 'cvv', 'monthlyIncome', 'annualIncome',
  'incomeTaxPaid', 'occupation', 'employerName', 'employmentType', 'fatherName', 'motherName',
  'spouseName', 'emergencyContactName', 'emergencyContactNumber', 'nomineeName', 'nomineeRelationship',
  'nomineeDOB', 'healthInsuranceProvider', 'healthPolicyNumber', 'medicalHistory', 'allergies',
  'ongoingMedications', 'dataConsent', 'educationalQualification', 'formCategory', 'preferredLanguage', 'additionalNotes'
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const profile = await prisma.profile.findUnique({
      where: { id },
    });
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    return NextResponse.json(profile);
  } catch (error) {
    console.error(`Error fetching profile with id ${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const formData = await request.formData();
    const rawFields: { [key: string]: any } = {};
    const fileFields = ['governmentIdFile', 'photoFile', 'signatureFile'];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (fileFields.includes(key) && value.size > 0) {
            const file = value;
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            const extension = path.extname(file.name);
            const filename = `${path.basename(file.name, extension)}-${uniqueSuffix}${extension}`;
            
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            await fs.mkdir(uploadDir, { recursive: true });
            const uploadPath = path.join(uploadDir, filename);
            
            await fs.writeFile(uploadPath, buffer);
            rawFields[key] = `/uploads/${filename}`;
        }
      } else {
        if (value) {
            rawFields[key] = value;
        }
      }
    }
    
    const dataForPrisma: { [key: string]: any } = {};
    for (const key of profileFields) {
        if (rawFields[key] !== undefined) {
            if (key === 'dataConsent') {
                dataForPrisma[key] = rawFields[key] === 'true';
            } else {
                dataForPrisma[key] = rawFields[key];
            }
        }
    }

    const updatedProfile = await prisma.profile.update({
      where: { id },
      data: dataForPrisma as Prisma.ProfileUpdateInput,
    });
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error(`Error updating profile with id ${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await prisma.profile.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(`Error deleting profile with id ${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}