"use client";

import { useState } from 'react';

export default function CompanyGrid() {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Header', description: 'Subhead' },
    { id: 2, name: 'Header', description: 'Subhead' },
    { id: 3, name: 'Header', description: 'Subhead' },
    { id: 4, name: 'Header', description: 'Subhead' }
  ]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50">
      {companies.map((company) => (
        <div 
          key={company.id} 
          className="flex items-start justify-between p-4 bg-blue-50 rounded-lg"
        >
          <div className="flex items-start">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-800 font-medium">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{company.name}</span>
              <span className="text-gray-500 text-sm">{company.description}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-gray-300 mb-2" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
            <div className="flex gap-2">
              <div className="w-5 h-5 bg-gray-300"></div>
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}