
"use client";
import { useState } from 'react';
import { CheckIcon } from 'lucide-react';

export default function SavedCompanies() {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Apple Inc.', ticker: 'AAPL', selected: false },
    { id: 2, name: 'Microsoft', ticker: 'MSFT', selected: false },
    { id: 3, name: 'Amazon', ticker: 'AMZN', selected: false },
    { id: 4, name: 'Google', ticker: 'GOOGL', selected: false },
    { id: 5, name: 'Tesla', ticker: 'TSLA', selected: false },
    { id: 6, name: 'Meta', ticker: 'META', selected: false },
    { id: 7, name: 'Netflix', ticker: 'NFLX', selected: false },
    { id: 8, name: 'Nvidia', ticker: 'NVDA', selected: false },
  ]);

  const toggleSelect = (id) => {
    setCompanies(companies.map(company => 
      company.id === id ? { ...company, selected: !company.selected } : company
    ));
  };

  return (
    <div className="mt-8 bg-gray-100 rounded-lg p-4">
      <h2 className="text-lg font-medium mb-4">Saved Companies</h2>
      <div className="space-y-1">
        {companies.map((company) => (
          <div 
            key={company.id}
            className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-md cursor-pointer"
            onClick={() => toggleSelect(company.id)}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-800 font-medium">A</span>
              </div>
              <div>
                <span className="font-medium">{company.name}</span>
                <span className="text-gray-500 text-sm ml-2">({company.ticker})</span>
              </div>
            </div>
            <div className={`w-6 h-6 rounded ${company.selected ? 'bg-purple-600' : 'border border-gray-300'} flex items-center justify-center`}>
              {company.selected && <CheckIcon size={16} color="white" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}