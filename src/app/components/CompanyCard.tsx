"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";
import { useState } from "react";

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
};

export default function CompanyCard({
  fiscalYear,
  company,
  currentRatio,
  quickRatio,
  debtToEquity,
  operatingMargin,
  netMargin,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}: CompanyCardProps) {
  const [functionCalled, setFunctionCalled] = useState(true);

  return (
    functionCalled && (
      <Card
        className="w-[1120px] h-[350px] bg-[#E3F7EC] border border-[#C7DBE6] shadow-2xl rounded-2xl 
                   transition duration-300 ease-in-out hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] 
                   hover:ring-2 hover:ring-[#233889] hover:scale-[1.01] relative"
      >
        {/* Soft gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C7DBE6] to-[#D8C0CF] blur-md opacity-20 z-0"></div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <CardHeader className="flex items-center gap-4 px-6 py-4">
            <Image
              alt="Company Logo"
              height={48}
              width={48}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#071108]">{company}</p>
              <Link
                href="https://github.com/heroui-inc/heroui"
                isExternal
                className="text-sm text-[#233889] hover:underline"
                showAnchorIcon
              >
                {company}.com
              </Link>
            </div>
          </CardHeader>

          <Divider />

          {/* Body */}
          <CardBody className="flex-1 px-6 py-2 overflow-auto">
            <ul className="space-y-3 text-base text-[#071108]">
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
              className="text-sm text-[#233889] hover:text-[#071108] transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <p className="text-sm font-medium text-[#071108]">{fiscalYear}</p>
            <button
              onClick={onNext}
              disabled={disableNext}
              className="text-sm text-[#233889] hover:text-[#071108] transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </CardFooter>
        </div>
      </Card>
    )
  );
}
