"use client";

import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@heroui/react";
import {useState} from 'react';
import { getFiveYearMetrics } from "../../app/apiFunctions/financeFunctions"



type CompanyCardProps = {
    fiscalYear: string;
    company: string;
    currentRatio: number;
    quickRatio: number;
    debtToEquity: number;
    operatingMargin: number;
    netMargin: number;
    onPrev: () => void;
    onNext: () => void;
    disablePrev?: boolean;
    disableNext?: boolean;
}


export default function CompanyCard({fiscalYear,
    company,
    currentRatio,
    quickRatio,
    debtToEquity,
    operatingMargin,
    netMargin,
    onPrev,
    onNext,
    disablePrev,
    disableNext,}: CompanyCardProps) {

    
    const [functionCalled, setFunctionCalled] = useState(true);

    return (
        functionCalled && (
          <Card className="w-[600px] h-[400px] shadow-xl bg-white  ">
          
            <CardHeader className="flex items-center gap-4 px-6 py-4">
              <Image
                alt="Company Logo"
                height={48}
                width={48}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              />
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-gray-900">{company}</p>
                <Link
                  href="https://github.com/heroui-inc/heroui"
                  isExternal
                  className="text-sm text-blue-600 hover:underline"
                  showAnchorIcon
                >
                  Company.com
                </Link>
              </div>
            </CardHeader>
    
            <Divider />
    
            {/* Body */}
            <CardBody className="flex-1 px-6 py-2 overflow-auto">
              <ul className="space-y-3 text-base text-gray-700">
                <li className="flex justify-between">
                  <span>Current Ratio:</span>
                  <span className="font-semibold">{currentRatio}</span>
                </li>
                <li className="flex justify-between">
                  <span>Quick Ratio:</span>
                  <span className="font-semibold">{quickRatio}</span>
                </li>
                <li className="flex justify-between">
                  <span>Debt to Equity:</span>
                  <span className="font-semibold">{debtToEquity}</span>
                </li>
                <li className="flex justify-between">
                  <span>Operating Margin:</span>
                  <span className="font-semibold">{operatingMargin}</span>
                </li>
                <li className="flex justify-between">
                  <span>Net Margin:</span>
                  <span className="font-semibold">{netMargin}</span>
                </li>
              </ul>
            </CardBody>
    
            <Divider />
    
            {/* Footer */}
            <CardFooter className="flex justify-between items-center px-6 py-3">
              <button
                onClick={onPrev}
                disabled={disablePrev}
                className="text-sm text-blue-600 hover:underline disabled:opacity-50"
              >
                ← Previous
              </button>
              <p className="text-sm font-medium text-gray-800">{fiscalYear}</p>
              <button
                onClick={onNext}
                disabled={disableNext}
                className="text-sm text-blue-600 hover:underline disabled:opacity-50"
              >
                Next →
              </button>
            </CardFooter>
          </Card>
        )
      );
}

