import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';
import type { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Validate that required fields are present
    const requiredFields = [
      'uid', 'firstName', 'lastName', 'nameAsPerID', 'dateOfBirth', 'gender', 'nationality',
      'permanentAddress', 'permanentCity', 'permanentState', 'permanentZip', 'primaryPhone', 'email'
    ];
    for (const field of requiredFields) {
      if (!formData.has(field) || !formData.get(field)) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Explicitly construct the data object to ensure type safety
    const data: Prisma.ProfileCreateInput = {
      uid: formData.get('uid') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      nameAsPerID: formData.get('nameAsPerID') as string,
      dateOfBirth: formData.get('dateOfBirth') as string,
      gender: formData.get('gender') as string,
      nationality: formData.get('nationality') as string,
      permanentAddress: formData.get('permanentAddress') as string,
      permanentCity: formData.get('permanentCity') as string,
      permanentState: formData.get('permanentState') as string,
      permanentZip: formData.get('permanentZip') as string,
      primaryPhone: formData.get('primaryPhone') as string,
      email: formData.get('email') as string,
    };

    // Define optional string fields
    const optionalStringFields: (keyof Prisma.ProfileCreateInput)[] = [
      'middleName', 'age', 'maritalStatus', 'placeOfBirth', 'bloodGroup', 'currentAddress', 'currentCity', 
      'currentState', 'currentZip', 'alternatePhone', 'communicationPreference', 'panNumber', 'aadhaarNumber',
      'voterIdNumber', 'passportNumber', 'bankName', 'accountNumber', 'ifscCode', 'creditCardNumber', 'cvv', 
      'monthlyIncome', 'annualIncome', 'incomeTaxPaid', 'occupation', 'employerName', 'employmentType', 
      'fatherName', 'motherName', 'spouseName', 'emergencyContactName', 'emergencyContactNumber', 'nomineeName', 
      'nomineeRelationship', 'nomineeDOB', 'healthInsuranceProvider', 'healthPolicyNumber', 'medicalHistory', 
      'allergies', 'ongoingMedications', 'educationalQualification', 'formCategory', 'preferredLanguage', 'additionalNotes'
    ];

    // Add optional string fields if they exist
    for (const field of optionalStringFields) {
      if (formData.has(field)) {
        const value = formData.get(field);
        if (typeof value === 'string' && value) {
          (data as any)[field] = value;
        }
      }
    }

    // Handle boolean field separately
    if (formData.has('dataConsent')) {
      data.dataConsent = formData.get('dataConsent') === 'true';
    }

    // Handle file uploads
    const fileFields = ['governmentIdFile', 'photoFile', 'signatureFile'];
    for (const field of fileFields) {
        if (formData.has(field)) {
            const value = formData.get(field);
            if (value instanceof File && value.size > 0) {
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
                (data as any)[field] = `/uploads/${filename}`;
            }
        }
    }

    const newProfile = await prisma.profile.create({
      data,
    });

    return NextResponse.json(newProfile, { status: 201 });
  } catch (error: any) {
    console.error('Error creating profile:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'A profile with this email or uid already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const profiles = await prisma.profile.findMany();
    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}