// pages/api/contact.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    console.log('Received contact form data:', { name, email, message });

    // You can now store to DB or send an email here

    res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
