

import axios from 'axios';
import * as cheerio from 'cheerio';

export interface Person {
  name: string;
  headline: string;
  linkedinUrl: string;
}

export async function fetchLinkedInFromDuckDuckGo(
  school: string,
  company: string
): Promise<Person[]> {
  const query = `site:linkedin.com/in "${company}" "${school}"`;
  const url = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`;

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept-Language': 'en-US,en;q=0.9',
  };

  try {
    const response = await axios.get(url, { headers });

   
    console.log('HTML content:', response.data);

    const $ = cheerio.load(response.data);
    const people: Person[] = [];

   
    const links = $('a.result-link');
    console.log('Number of matched links:', links.length);

    links.each((i, el) => {
      const rawLink = $(el).attr('href') || '';
      console.log('Raw link:', rawLink);

      if (people.length >= 10) return;

      const text = $(el).text().trim();

      
      const urlMatch = rawLink.match(/uddg=([^&]+)/);
      const decodedLink = urlMatch ? decodeURIComponent(urlMatch[1]) : '';

      if (!decodedLink.includes('linkedin.com/in')) {
        console.log('Skipped link:', decodedLink);
      }

      if (decodedLink.includes('linkedin.com')) { 
        const [name, ...headlineParts] = text.split(' - ');
        const headline = headlineParts.join(' - ') || '';

        people.push({
          name: name.trim(),
          headline: headline.trim(),
          linkedinUrl: decodedLink,
        });
      }
    });

    console.log('Scraped people:', people);
    return people;
  } catch (error: any) {
    console.error('DuckDuckGo Scraper Error:', error.message || error);
    return [];
  }
}
