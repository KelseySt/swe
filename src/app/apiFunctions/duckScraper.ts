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
  const targetUrl = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`;
  const proxyUrl = `http://localhost:8080/proxy?url=${encodeURIComponent(targetUrl)}`;

  console.log('Proxy URL:', proxyUrl);
  

  const people: Person[] = [];

  try {
    const response = await axios.get(proxyUrl); // Use the proxy server
    console.log('HTML content fetched successfully.');
    console.log('HTML Content:', response.data);

    const $ = cheerio.load(response.data);

    // Select all result links
    $('a.result-link').each((i, el) => {
      if (people.length >= 40) return; // Limit to 40 results

      const rawLink = $(el).attr('href') || '';
      const text = $(el).text().trim();

      // Decode the LinkedIn URL from DuckDuckGo's redirect URL
      const decodedLink = decodeURIComponent(
        rawLink.match(/uddg=([^&]+)/)?.[1] || rawLink
      );

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
  } catch (error) {
    console.error('Error in fetchLinkedInFromDuckDuckGo:', error.message);
    return [];
  }
}
