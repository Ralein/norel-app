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
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const profile = await prisma.profile.findUnique({ where: { id: id as string } });
        if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching profile' });
      }
      break;
    case 'PUT':
      try {
        const { fields, files } = await parseForm(req);
        const profileData = getProfileData(fields, files);

        const profile = await prisma.profile.update({
          where: { id: id as string },
          data: profileData,
        });
        res.status(200).json({ message: 'Profile updated successfully', profile });
      } catch (error: any) {
        console.error(error);
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
          return res.status(409).json({ message: 'A profile with this email already exists.' });
        }
        if (error instanceof formidable.errors.FormidableError) {
            return res.status(500).json({ message: 'Error parsing the form data' });
        }
        res.status(500).json({ message: 'Error updating profile' });
      }
      break;
    case 'DELETE':
      try {
        await prisma.profile.delete({ where: { id: id as string } });
        res.status(200).json({ message: 'Profile deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting profile' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}