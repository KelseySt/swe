'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Check, Trash2 } from 'lucide-react';

// Define types for our component
interface Company {
  id: number;
  name: string;
  ticker: string;
  selected: boolean;
}

const abbreviations: string[] = [
  "AAPL", "TSLA", "AMZN", "MSFT", "NVDA", "GOOGL", "META", "NFLX", "JPM", "V",
  "BAC", "AMD", "PYPL", "DIS", "T", "PFE", "COST", "INTC", "KO", "TGT",
  "NKE", "SPY", "BA", "BABA", "XOM", "WMT", "GE", "CSCO", "VZ", "JNJ",
  "CVX", "PLTR", "SQ", "SHOP", "SBUX", "SOFI", "HOOD", "RBLX", "SNAP", "AMD",
  "UBER", "FDX", "ABBV", "ETSY", "MRNA", "LMT", "GM", "F", "RIVN", "LCID"
  // Shortened the list for readability
];

// Company name mapping (for demonstration)
const companyNames: Record<string, string> = {
  "AAPL": "Apple Inc.",
  "TSLA": "Tesla, Inc.",
  "AMZN": "Amazon.com, Inc.",
  "MSFT": "Microsoft Corporation",
  "NVDA": "NVIDIA Corporation",
  "GOOGL": "Alphabet Inc.",
  "META": "Meta Platforms, Inc.",
  "NFLX": "Netflix, Inc.",
  "JPM": "JPMorgan Chase & Co.",
  "V": "Visa Inc."
  // Add more as needed
};

const getCompanyName = (ticker: string): string => {
  return companyNames[ticker] || `${ticker} Corp.`;
};

const AutocompleteWithSaved: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  const router = useRouter();
  const [savedCompanies, setSavedCompanies] = useState<Company[]>([
    { id: 1, name: 'Apple Inc.', ticker: 'AAPL', selected: false },
    { id: 2, name: 'Microsoft', ticker: 'MSFT', selected: false },
    { id: 3, name: 'Amazon', ticker: 'AMZN', selected: false },
    { id: 4, name: 'Google', ticker: 'GOOGL', selected: false }
  ]);

  // For checking if a company is already saved
  const [savedTickers, setSavedTickers] = useState<Set<string>>(new Set(['AAPL', 'MSFT', 'AMZN', 'GOOGL']));

  useEffect(() => {
    // Update savedTickers set when savedCompanies changes
    const tickers = new Set(savedCompanies.map(company => company.ticker));
    setSavedTickers(tickers);
  }, [savedCompanies]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearchTerm(value);
    search(value);
  };

  const search = (term: string): void => {
    if (!term.trim()) {
      setResults([]);
      return;
    }
    
    const filteredResults = abbreviations.filter((result) =>
      result.toLowerCase().startsWith(term.toLowerCase())
    );

    setResults(filteredResults.slice(0, 10)); // Limit to 10 results for better UI
  };

  const addToSavedCompanies = (ticker: string): void => {
    if (!savedTickers.has(ticker)) {
      const newCompany: Company = {
        id: savedCompanies.length + 1,
        name: getCompanyName(ticker),
        ticker: ticker,
        selected: false
      };
      
      setSavedCompanies([...savedCompanies, newCompany]);
    }
  };

  const removeFromSavedCompanies = (id: number): void => {
    setSavedCompanies(savedCompanies.filter(company => company.id !== id));
  };

  const toggleSelect = (id: number): void => {
    setSavedCompanies(savedCompanies.map(company => 
      company.id === id ? { ...company, selected: !company.selected } : company
    ));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Search Bar */}
      <div className="relative w-full mx-auto mt-6">
        <input
          type="text"
          placeholder="Search for a company abbreviation..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        
        {/* Search Results */}
        {results.length > 0 && (
          <ul className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 border border-gray-200 max-h-64 overflow-y-auto">
            {results.map((ticker, index) => (
              <li 
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
              >
                <span 
                  className="flex-grow cursor-pointer"
                  onClick={() => router.push(`/company/${ticker}`)}
                >
                  {ticker}
                </span>
                
                {savedTickers.has(ticker) ? (
                  <span className="text-green-600 flex items-center">
                    <Check size={18} className="mr-1" />
                    Saved
                  </span>
                ) : (
                  <button
                    onClick={() => addToSavedCompanies(ticker)}
                    className="flex items-center text-purple-600 hover:text-purple-800 px-2 py-1 rounded"
                  >
                    <PlusCircle size={18} className="mr-1" />
                    Add
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Saved Companies List */}
      <div className="mt-8 bg-gray-100 rounded-lg p-4">
        <h2 className="text-lg font-medium mb-4">Saved Companies</h2>
        <div className="space-y-1">
          {savedCompanies.map((company) => (
            <div 
              key={company.id}
              className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-md"
            >
              <div 
                className="flex items-center flex-grow cursor-pointer"
                onClick={() => toggleSelect(company.id)}
              >
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-800 font-medium">{company.ticker.charAt(0)}</span>
                </div>
                <div>
                  <span className="font-medium">{company.name}</span>
                  <span className="text-gray-500 text-sm ml-2">({company.ticker})</span>
                </div>
              </div>
              <div className="flex items-center">
                <div 
                  className={`w-6 h-6 rounded ${company.selected ? 'bg-purple-600' : 'border border-gray-300'} flex items-center justify-center mr-3`}
                >
                  {company.selected && <Check size={16} color="white" />}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering toggle selection
                    removeFromSavedCompanies(company.id);
                  }}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-gray-200"
                  title="Remove from saved list"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutocompleteWithSaved;