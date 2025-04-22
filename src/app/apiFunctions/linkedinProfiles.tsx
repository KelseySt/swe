import { fetchLinkedInFromDuckDuckGo } from './duckScraper'; // Adjust the path based on your project structure

// Export the function so it can be used in other .tsx files
export async function getLinkedInProfiles(school: string, company: string) {
  try {
    const people = await fetchLinkedInFromDuckDuckGo(school, company);
    return people;
  } catch (error) {
    console.error('Error fetching LinkedIn profiles:', error);
    throw error;
  }
}