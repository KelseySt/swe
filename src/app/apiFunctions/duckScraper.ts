import axios from 'axios';
import * as cheerio from 'cheerio';

export interface Person {
  name: string;
  headline: string;
  linkedinUrl: string;
}

// Expanded list of User-Agent strings
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:110.0) Gecko/20100101 Firefox/110.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7; rv:110.0) Gecko/20100101 Firefox/110.0',
  'Mozilla/5.0 (X11; Linux x86_64; rv:110.0) Gecko/20100101 Firefox/110.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/110.0.1587.41',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPad; CPU OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Linux; Android 12; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Mobile/15E148 Safari/604.1',
];

export async function fetchLinkedInFromDuckDuckGo(
  school: string,
  company: string
): Promise<Person[]> {
  const query = `site:linkedin.com "${company}" "${school}"`;
  const url = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`;
  console.log('DuckDuckGo Lite URL:', url);

  const people: Person[] = [];

  // Randomly select a User-Agent
  const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
  console.log('Using User-Agent:', randomUserAgent);

  const headers = {
    'User-Agent': randomUserAgent,
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache', // Prevent caching
    Pragma: 'no-cache', // Prevent caching
  };

  try {
    // Make the request with Axios
    const response = await axios.get(url, { headers });

    // Debugging: Log the HTML content
    console.log('HTML content:', response.data);

    const $ = cheerio.load(response.data);

    // Select all links with the class "result-link" (for LinkedIn profiles)
    const links = $('a.result-link');
    console.log('Number of matched links:', links.length);

    links.each((i, el) => {
      if (people.length >= 40) return; // Limit to 40 results

      const rawLink = $(el).attr('href') || '';
      const text = $(el).text().trim();

      // Decode the DuckDuckGo redirect URL if present
      const decodedLink = decodeURIComponent(
        rawLink.match(/uddg=([^&]+)/)?.[1] || rawLink
      );

      // Only include LinkedIn URLs
      if (decodedLink.includes('linkedin.com')) {
        const [name, ...headlineParts] = text.split(' - ');
        const headline = headlineParts.join(' - ') || '';

        // Normalize the headline and company name for comparison
        const normalizedHeadline = headline.toLowerCase();
        const normalizedCompany = company.toLowerCase();

        // Check if the headline contains any word from the company name
        const companyWords = normalizedCompany.split(' ');
        const isCompanyInHeadline = companyWords.some((word) =>
          normalizedHeadline.includes(word)
        );

        // Only add the person if the company name is found in the headline
        if (isCompanyInHeadline) {
          people.push({
            name: name.trim(),
            headline: headline.trim(),
            linkedinUrl: decodedLink, // Use the decoded LinkedIn URL
          });
        } else {
          console.log('Skipped person due to unmatched company:', {
            name: name.trim(),
            headline: headline.trim(),
            linkedinUrl: decodedLink,
          });
        }
      } else {
        console.log('Skipped link:', rawLink);
      }
    });
    
    console.log('Scraped people:', people);
    return people;
  } catch (error: any) {
    console.error('DuckDuckGo Lite Scraper Error:', error.message || error);
    return [];
  }
}
