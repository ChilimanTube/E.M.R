import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    return res.status(200).json({ message: 'User account created successfully' });
  } else {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}