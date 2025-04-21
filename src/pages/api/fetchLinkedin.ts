import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchLinkedInFromDuckDuckGo } from '../../app/apiFunctions/duckScraper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { school, company } = req.body;

  if (!school || !company) {
    return res.status(400).json({ message: 'Missing school or company' });
  }

  try {
    const people = await fetchLinkedInFromDuckDuckGo(school, company);
    return res.status(200).json(people);
  } catch (err: any) {
    return res.status(500).json({ message: 'Scraper failed', error: err.message });
  }
}
