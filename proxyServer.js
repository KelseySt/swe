const express = require('express');
const puppeteer = require('puppeteer-extra');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

// Add stealth plugin
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all requests
app.use(cors());

// Request logging
app.use(morgan('dev'));

// Set up rate limiting to respect service limits
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit to 5 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again after a minute',
});
app.use('/proxy', limiter);

// Keep track of browser instance
let browser = null;

// Ensure we close the browser when the server shuts down
process.on('SIGINT', async () => {
  if (browser) {
    console.log('Closing browser before exit');
    await browser.close();
  }
  process.exit();
});

// Function to get or create a browser
async function getBrowser() {
  if (!browser) {
    console.log('Launching new browser instance');
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080',
      ],
    });
    
    // Automatically close the browser after 30 minutes to refresh the session
    setTimeout(async () => {
      if (browser) {
        console.log('Closing browser after timeout');
        await browser.close();
        browser = null;
      }
    }, 30 * 60 * 1000);
  }
  return browser;
}

// Proxy route with more ethical considerations
app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).send('Missing "url" query parameter');
  }
  
  // Only allow requests to DuckDuckGo lite and html versions
  if (!url.includes('lite.duckduckgo.com') && !url.includes('html.duckduckgo.com')) {
    return res.status(403).send('Only DuckDuckGo lite and html versions are allowed');
  }
  
  console.log(`Processing request for: ${url}`);
  let currentPage = null;
  
  try {
    const browser = await getBrowser();
    currentPage = await browser.newPage();
    
    // Set a reasonable User-Agent
    await currentPage.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    );
    
    // Set extra HTTP headers to look like a normal browser
    await currentPage.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Referer': 'https://duckduckgo.com/',
    });
    
    // Navigate to the URL with a timeout
    await currentPage.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 20000
    });
    
    // Wait for a moment to let the page fully load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if we hit a captcha
    const content = await currentPage.content();
    if (
      content.includes('captcha') || 
      content.includes('CAPTCHA') ||
      content.includes('Please solve this CAPTCHA') ||
      content.includes('unusual traffic from your computer')
    ) {
      console.log('Captcha detected!');
      
      if (currentPage) await currentPage.close();
      return res.status(429).send('Search engine returned a captcha. Please try again later.');
    }
    
    // Send the HTML content back to the client
    res.set('Content-Type', 'text/html');
    res.send(content);
  } catch (error) {
    console.error('Error in proxy server:', error.message);
    res.status(500).send(`Error fetching data: ${error.message}`);
  } finally {
    // Always close the page when done
    if (currentPage) {
      await currentPage.close();
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Add endpoint to explicitly close the browser
app.post('/reset', async (req, res) => {
  if (browser) {
    await browser.close();
    browser = null;
    console.log('Browser instance reset');
  }
  res.status(200).send('Browser reset successful');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});