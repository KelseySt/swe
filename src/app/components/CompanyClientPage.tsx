'use client';

import { useState } from "react";
import CompanyCard from "./ CompanyCard";

type Metric = {
  fiscalYear: string;
  currentRatio: number;
  quickRatio: number;
  debtToEquity: number;
  operatingMargin: number;
  netMargin: number;
};

export default function CompanyClientPage({ company, metrics }: { company: string; metrics: Metric[] }) {
  const [index, setIndex] = useState(0);


  // the min makes sure that index doesn't go out of boundaries
  const handlePrevious = () => {
    setIndex((prev) => Math.min(prev + 1, metrics.length - 1));
  };

  const handleNext = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const currentData = metrics[index];

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="w-[600px]">
        <CompanyCard
          fiscalYear={currentData.fiscalYear}
          company={company}
          currentRatio={currentData.currentRatio}
          quickRatio={currentData.quickRatio}
          debtToEquity={currentData.debtToEquity}
          operatingMargin={currentData.operatingMargin}
          netMargin={currentData.netMargin}
          onPrev={handlePrevious}
          onNext={handleNext}
          disablePrev={index >= metrics.length - 1}
          disableNext={index <= 0}
        />
      </div>
    </div>
  );
  
}
