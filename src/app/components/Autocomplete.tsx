'use client'
import React, { useState } from 'react';
import { companies } from '../apiFunctions/companies';

const abreviations = [
    "AAPL", "TSLA", "AMZN", "MSFT", "NVDA", "GOOGL", "META", "NFLX", "JPM", "V",
    "BAC", "AMD", "PYPL", "DIS", "T", "PFE", "COST", "INTC", "KO", "TGT",
    "NKE", "SPY", "BA", "BABA", "XOM", "WMT", "GE", "CSCO", "VZ", "JNJ",
    "CVX", "PLTR", "SQ", "SHOP", "SBUX", "SOFI", "HOOD", "RBLX", "SNAP", "AMD",
    "UBER", "FDX", "ABBV", "ETSY", "MRNA", "LMT", "GM", "F", "RIVN", "LCID",
    "CCL", "DAL", "UAL", "AAL", "TSM", "SONY", "ET", "NOK", "MRO", "COIN",
    "RIVN", "SIRI", "SOFI", "RIOT", "CPRX", "PYPL", "TGT", "VWO", "SPYG", "NOK",
    "ROKU", "HOOD", "VIAC", "ATVI", "BIDU", "DOCU", "ZM", "PINS", "TLRY", "WBA",
    "VIAC", "MGM", "NFLX", "NIO", "C", "GS", "WFC", "ADBE", "PEP", "UNH",
    "CARR", "FUBO", "HCA", "TWTR", "BILI", "SIRI", "VIAC", "FUBO", "RKT"
];


const Autocomplete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleInputChange = (event : any) => {
    const { value } = event.target;
    setSearchTerm(value);
    search(value);
  };

  const search = (term : any) => {
    // Perform your search logic here
    // This is just a sample implementation, replace it with your own data source or API call

    // Filter the results based on the search term
    const filteredResults : string[] = abreviations.filter((result) =>
      // result.toLowerCase().includes(term.toLowerCase())
      result.toLowerCase().startsWith(term.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        
        value={searchTerm}
        onChange={handleInputChange}
      />
      <ul>
        {results.map((result, index) => (
          <li 
            className={`hover:bg-[#B0ACE9]`} 
            key={index} 
            onClick={() => {
              console.log("selected: ", result);

            }}
          >{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;