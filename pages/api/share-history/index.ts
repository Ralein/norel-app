import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const shareHistory = await prisma.shareHistory.findMany({
          orderBy: {
            timestamp: 'desc',
          },
        });
        res.status(200).json(shareHistory);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching share history' });
      }
      break;
    case 'POST':
      try {
        const { profileId, formType, location } = req.body;
        const newShare = await prisma.shareHistory.create({
          data: {
            profileId,
            formType,
            location,
          },
        });
        res.status(201).json({ message: 'Share history created successfully', share: newShare });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating share history' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
